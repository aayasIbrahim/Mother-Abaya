"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { z } from "zod";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";
// import { initiatePayment } from "@/libs/payment"; 
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
    const imageFile = formData.get("image") as File;

    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;

    if (!imageFile || imageFile.size === 0) {
      return { error: "Please upload a product image." };
    }

    if (!imageFile.type.startsWith("image/")) {
      return { error: "Only image files are allowed." };
    }

    if (!name || isNaN(price) || !category) {
      return { error: "Invalid product data." };
    }

    if (discountPrice && discountPrice >= price) {
      return { error: "Discount price must be lower than original price." };
    }

    if (isNaN(stock) || stock < 0) {
      return { error: "Invalid stock value." };
    }

    const uploadRes: any = await uploadToCloudinary(imageFile);
    const imageUrl = uploadRes.secure_url;
    const newProduct = await Product.create({
      name,
      price,
      discountPrice,
      category,
      images: [imageUrl],
      stock,
      description,
      // details: { fabric },
      // measurements: { kurtiLength },
      isSale: discountPrice ? true : false,
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Product Error:", error);
    // ডুপ্লিকেট নাম থাকলে হ্যান্ডেল করা
    if (error.code === 11000)
      return { error: "A product with this name already exists." };
    return { error: "Failed to publish the product. Please try again." };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await connectDB();

    // ১. ডাটাবেস থেকে প্রোডাক্টটি খুঁজে বের করুন
    const product = await Product.findById(id);
    if (!product) {
      return { error: "Product not found!" };
    }

    // ২. ক্লাউডিনারি থেকে ইমেজ ডিলিট করা
    // আপনার স্কিমা যদি images: [{ url, publicId }] এই ফরম্যাটে হয়:
    const imageToDelete = product.images?.[0]; // আমরা প্রথম ইমেজটি নিচ্ছি

    if (imageToDelete && imageToDelete.publicId) {
      const cloudinaryRes = await deleteFromCloudinary(imageToDelete.publicId);
      console.log("📡 Cloudinary Response:", cloudinaryRes);

      // ক্লাউডিনারি যদি 'ok' না পাঠায়, তবুও আমরা ডাটাবেস থেকে ডিলিট করতে পারি
      // অথবা চাইলে এরর রিটার্ন করতে পারি
      if (cloudinaryRes.result !== "ok") {
        console.warn(
          "Cloudinary Image not found or already deleted:",
          imageToDelete.publicId,
        );
      }
    }

    // ৩. ডাটাবেস থেকে প্রোডাক্ট রিমুভ করা
    await Product.findByIdAndDelete(id);

    // ৪. পেজ রিফ্রেশ (Next.js Cache Clear)
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Action Error:", error);
    return { error: "Failed to delete product. Please try again." };
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  try {
    await connectDB();

    // ১. আগের প্রোডাক্টটি খুঁজে বের করা
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
    const imageFile = formData.get("image") as File;

    // ৩. ইমেজ লজিক (আপনার স্কিমা যেহেতু [String] সাপোর্ট করে)
    let finalImages = existingProduct.images; // ডিফল্ট পুরানো ইমেজ

    if (imageFile && imageFile.size > 0) {
      console.log("📸 New image detected, uploading...");
      const uploadRes: any = await uploadToCloudinary(imageFile);

      // শুধুমাত্র সিকিউর ইউআরএল স্ট্রিং হিসেবে সেভ করা (আপনার addProduct এর মত)
      finalImages = [uploadRes.secure_url];
    }

    // ৪. ডাটাবেস আপডেট
    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        discountPrice,
        category,
        stock,
        description,
        images: finalImages, // এটি এখন Array of Strings, তাই Cast Error হবে না
        "details.fabric": fabric,
        isSale: discountPrice ? true : false,
      },
      { runValidators: true },
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


