"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";

import { revalidatePath } from "next/cache";
import { uploadToCloudinary, deleteFromCloudinary } from "@/libs/cloudinary";

export const addProduct = async (formData: FormData) => {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    const discountPrice = formData.get("discountPrice")
      ? Number(formData.get("discountPrice"))
      : undefined;

    const category = formData.get("category") as string;
    const fabric = formData.get("fabric") as string;
    const description = formData.get("description") as string;

    const imageFiles = formData.getAll("images") as File[];

    // sizes parse
    const sizesString = formData.get("sizes") as string;
    const parsedSizes = sizesString ? JSON.parse(sizesString) : [];

    // total stock calculate
    const totalStock = parsedSizes.reduce(
      (acc: number, curr: any) => acc + (Number(curr.stock) || 0),
      0,
    );

    // Validation
    if (!imageFiles || imageFiles.length === 0 || imageFiles[0].size === 0) {
      return { error: "Please upload at least one product image." };
    }

    if (!name || isNaN(price) || !category) {
      return { error: "Invalid product data." };
    }

    if (!description || description.trim() === "") {
      return { error: "Product description is required!" };
    }

    if (discountPrice && discountPrice >= price) {
      return { error: "Discount price must be lower than original price." };
    }

    if (!parsedSizes.length) {
      return { error: "Please add at least one size." };
    }

    // upload images
    const uploadPromises = imageFiles.map((file) => uploadToCloudinary(file));
    const uploadResults: any[] = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((res) => res.secure_url);

    // create product
    const newProduct = await Product.create({
      name,
      price,
      discountPrice,
      category,
      images: imageUrls,
      stock: totalStock,
      description,
      fabric,
      sizes: parsedSizes,
      isSale: !!discountPrice,
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, message: "Product Published Successfully!" };
  } catch (error: any) {
    console.error("Product Error:", error);

    if (error.code === 11000) {
      return { error: "A product with this name already exists." };
    }

    return { error: "Failed to publish the product. Please try again." };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await connectDB();

    // ১. প্রোডাক্টটি খুঁজে বের করা
    const product = await Product.findById(id);
    if (!product) return { error: "Product not found!" };

    // ২. ক্লাউডিনারি থেকে সব ইমেজ ডিলিট করা
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(async (imageUrl: string) => {
        // ১. URL টি স্প্লিট করুন
        const parts = imageUrl.split("/");

        // ২. ফাইল নেম এবং এক্সটেনশন আলাদা করুন (e.g., image.jpg -> image)
        const lastPart = parts[parts.length - 1];
        const publicIdWithoutExtension = lastPart.split(".")[0];

        // ৩. ফোল্ডার স্ট্রাকচার হ্যান্ডেল করা (Version number এড়িয়ে যাওয়া)
        // সাধারণত URL থাকে: .../upload/v1234567/folder_name/image_name.jpg
        // আমরা শুধু v... এর পরের অংশটুকু নেব
        const vIndex = parts.findIndex(
          (part) => part.startsWith("v") && !isNaN(Number(part.substring(1))),
        );

        let publicId = "";
        if (vIndex !== -1) {
          // v123... এর পরের সব অংশ যোগ করা (ফোল্ডার থাকলে সেটিও আসবে)
          publicId =
            parts.slice(vIndex + 1, parts.length - 1).join("/") +
            (parts.slice(vIndex + 1, parts.length - 1).length > 0 ? "/" : "") +
            publicIdWithoutExtension;
        } else {
          publicId = publicIdWithoutExtension;
        }

        console.log("🚀 Corrected publicId for deletion:", publicId);
        return deleteFromCloudinary(publicId);
      });

      // সবগুলো ইমেজ একসাথে ডিলিট করার রিকোয়েস্ট পাঠানো
      await Promise.all(deletePromises);
    }

    // ৩. ডাটাবেস থেকে প্রোডাক্ট মুছে ফেলা
    await Product.findByIdAndDelete(id);

    // ৪. ক্যাশ ক্লিয়ার করা
    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true, message: "Product and all images deleted!" };
  } catch (error: any) {
    console.error("Delete Action Error:", error);
    return { error: "Failed to delete product. Please try again." };
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  try {
    await connectDB();

    const existingProduct = await Product.findById(id);
    if (!existingProduct) return { error: "Product not found!" };

    // ২. ডাটা সংগ্রহ
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const discountPrice = formData.get("discountPrice")
      ? Number(formData.get("discountPrice"))
      : undefined;
    const category = formData.get("category") as string;
    const fabric = formData.get("fabric") as string;
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;
    const newImageFiles = formData.getAll("images") as File[];
    // ২. সাইজ ডাটা পার্স করা এবং টোটাল স্টক ক্যালকুলেশন
    const sizesData = formData.get("sizes") as string;
    const parsedSizes = sizesData ? JSON.parse(sizesData) : [];

    // সব সাইজের স্টক যোগফলই হবে মেইন স্টক
    const totalStock = parsedSizes.reduce(
      (acc: number, curr: any) => acc + (Number(curr.stock) || 0),
      0,
    );

    // ফ্রন্টএন্ড থেকে পাঠানো বর্তমানে টিকে থাকা পুরনো ইমেজগুলোর লিস্ট (JSON string থেকে array তে রূপান্তর)
    const existingImagesData = formData.get("existingImages") as string;
    let finalImages: string[] = existingImagesData
      ? JSON.parse(existingImagesData)
      : [];
    if (
      newImageFiles &&
      newImageFiles.length > 0 &&
      newImageFiles[0].size > 0
    ) {
      console.log(
        `📸 ${newImageFiles.length} new images detected, uploading...`,
      );

      const uploadPromises = newImageFiles.map((file) =>
        uploadToCloudinary(file),
      );
      const uploadResults: any[] = await Promise.all(uploadPromises);

      const newImageUrls = uploadResults.map((res) => res.secure_url);

      // পুরনো ইমেজগুলোর সাথে নতুনগুলো যোগ করা
      finalImages = [...finalImages, ...newImageUrls];
    }

    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        discountPrice,
        category,
        stock: totalStock,
        description,
        images: finalImages,
        fabric,
        sizes: parsedSizes,
        isSale: discountPrice ? true : false,
      },
      { runValidators: true, new: true },
    );

    console.log("✅ Product Updated Successfully");

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${id}`);

    return { success: true };
  } catch (error: any) {
    console.error("Update Product Error:", error);
    return { error: "Failed to update product. " + error.message };
  }
};

export async function searchProducts(query: string) {
  try {
    await connectDB();
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .select("name price images category")
      .limit(8)
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}
