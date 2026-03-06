"use server";

import { revalidatePath } from "next/cache";
import StoreSettings from "@/models/Settings";
import connectDB from "@/libs/db";

export async function updateStoreSettings(formData: FormData) {
  try {
    await connectDB();

    // ডাটা এক্সট্রাক্ট করা
    const data = {
      insideDhaka: Number(formData.get("insideDhaka")) || 0,
      outsideDhaka: Number(formData.get("outsideDhaka")) || 0,
      bkashNumber: (formData.get("bkashNumber") as string) || "",
      supportEmail: (formData.get("supportEmail") as string) || "",
      // Checkbox হ্যান্ডেল করার সঠিক উপায় (এটি 'on' স্ট্রিং রিটার্ন করে যদি চেকড থাকে)
      maintenanceMode: formData.get("maintenanceMode") === "on",
      announcementText: (formData.get("announcementText") as string) || "",
      showAnnouncement: formData.get("showAnnouncement") === "on",
      facebookUrl: (formData.get("facebookUrl") as string) || "",
      instagramUrl: (formData.get("instagramUrl") as string) || "",
      whatsappNumber: (formData.get("whatsappNumber") as string) || "",
    };

    // ১টি মাত্র ডকুমেন্ট আপডেট বা তৈরি করবে
    await StoreSettings.findOneAndUpdate(
      {},
      { $set: data },
      { 
        upsert: true, 
        // 'new: true' এর পরিবর্তে 'returnDocument: 'after'' ব্যবহার করা হয়েছে 
        // যাতে ওই ডিপ্রিকেশন ওয়ার্নিং না আসে।
        returnDocument: 'after' 
      }
    );

    // ক্যাশ ক্লিয়ার করা যাতে নতুন ডাটা সাথে সাথে দেখা যায়
    revalidatePath("/admin/settings"); 
    revalidatePath("/");

    return { success: true, message: "Settings Updated Successfully! 🚀" };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update settings. ❌" };
  }
}