"use server";

import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { deleteFromCloudinary } from "@/libs/cloudinary";
import { revalidatePath } from "next/cache";

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
