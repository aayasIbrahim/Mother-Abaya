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
    return { success: true };
  } catch (error: any) {
    console.error("Product Error:", error);
    // ডুপ্লিকেট নাম থাকলে হ্যান্ডেল করা
    if (error.code === 11000)
      return { error: "A product with this name already exists." };
    return { error: "Failed to publish the product. Please try again." };
  }
};
