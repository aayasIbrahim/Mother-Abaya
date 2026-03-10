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
    if (!session?.user?.email) {
      return { error: "Unauthorized access! Please login again." };
    }

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { error: "User account not found!" };
    }

    // ১. নাম and Phone  আপডেট লজিক (এর জন্য পাসওয়ার্ড লাগবে না)
    if (name) user.name = name;

    if (phone) user.phone = phone;

    // ২. পাসওয়ার্ড আপডেট লজিক (এটি তখনই চলবে যদি ইউজার নতুন পাসওয়ার্ড ফিল্ডে কিছু লেখে)
    if (newPassword) {
      // পাসওয়ার্ড বদলাতে গেলে ওল্ড পাসওয়ার্ড অবশ্যই দিতে হবে
      if (!oldPassword) {
        return { error: "Current password is required to set a new password!" };
      }

      // ওল্ড পাসওয়ার্ড ভেরিফিকেশন
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isPasswordCorrect) {
        return { error: "Current password is incorrect!" };
      }

      // নতুন পাসওয়ার্ড ভ্যালিডেশন
      if (newPassword !== confirmPassword) {
        return { error: "New passwords do not match!" };
      }
      if (newPassword.length < 6) {
        return { error: "New password must be at least 6 characters long!" };
      }

      // পাসওয়ার্ড হ্যাশ করে সেভ করা
      user.password = await bcrypt.hash(newPassword, 12);
    }

    await user.save();

    revalidatePath("/admin/edit-profile");
    revalidatePath("/admin");

    return {
      success: "Profile updated successfully!",
      newName: user.name,
      newPhone: user.phone,
    };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "An internal server error occurred." };
  }
}
