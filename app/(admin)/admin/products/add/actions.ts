"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/libs/cloudinary";

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
    if (!imageFile || imageFile.size === 0) {
      return { error: "Please upload a product image." };
    }
    const uploadRes: any = await uploadToCloudinary(imageFile);
    const imageUrl = uploadRes.secure_url;
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;

    // বিশেষ ডিটেইলস
    const fabric = formData.get("fabric") as string;
    const kurtiLength = formData.get("kurtiLength") as string;

    // সিম্পল ভ্যালিডেশন
    if (!name || !price || !category || !imageUrl) {
      return { error: "Failed to publish the product. Please try again." };
    }

    const newProduct = await Product.create({
      name,
      price,
      discountPrice,
      category,
      images: [imageUrl],
      stock,
      description,
      details: { fabric },
      measurements: { kurtiLength },
      isSale: discountPrice ? true : false,
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    console.error("Product Error:", error);
    // ডুপ্লিকেট নাম থাকলে হ্যান্ডেল করা
    if (error.code === 11000)
      return { error: "A product with this name already exists." };
    return { error: "Failed to publish the product. Please try again." };
  }
};
