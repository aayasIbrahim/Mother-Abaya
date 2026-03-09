"use server";
import connectDB from "@/libs/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOption";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateUserRole(userId: string, newRole: string) {
  try {
    await connectDB();
    await User.findByIdAndUpdate(userId, { role: newRole });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update role" };
  }
}
export async function deleteUser(userId: string) {
  try {
    await connectDB();
    await User.findByIdAndDelete(userId);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}



// পাসওয়ার্ড পরিবর্তনের লজিক
export async function updateProfileAction(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { error: "Unauthorized!" };

    const name = formData.get("name") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    await connectDB();

    const updateData: any = {};
    if (name) updateData.name = name;

    // পাসওয়ার্ড পরিবর্তনের লজিক
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        return { error: "পাসওয়ার্ড ম্যাচ করেনি!" };
      }
      if (newPassword.length < 6) {
        return { error: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে!" };
      }
      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
    );

    // পেজ রিফ্রেশ না করে ডাটা আপডেট করার জন্য
    revalidatePath("/admin/profile");

    return { success: "প্রোফাইল সফলভাবে আপডেট হয়েছে!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
