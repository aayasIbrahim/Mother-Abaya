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
        new: true, // Mongoose এর লেটেস্ট ভার্সনে এটি নিরাপদ
        runValidators: true, // স্কিমা ভ্যালিডেশন এনফোর্স করবে
      },
    );

    // ক্যাশ ক্লিয়ার করা যাতে নতুন ডাটা সাথে সাথে দেখা যায়
    const pathsToRevalidate = [
      "/",
      "/admin/settings",
      "/checkout",
      "/cart",
      "/contact-us",
    ];
    pathsToRevalidate.forEach((path) => revalidatePath(path));

    return { success: true, message: "Settings Updated Successfully! 🚀" };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, message: "Failed to update settings. ❌" };
  }
}

export async function getStoreSettings() {
  try {
    await connectDB();
    const settings = await StoreSettings.findOne({}).lean();
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
export async function getShippingCharges() {
  try {
    await connectDB();
    const settings = await StoreSettings.findOne({}).lean();
    return {
      insideDhaka: settings?.insideDhaka || 80,
      outsideDhaka: settings?.outsideDhaka || 150,
    };
  } catch (error) {
    return { insideDhaka: 80, outsideDhaka: 150 };
  }
}
