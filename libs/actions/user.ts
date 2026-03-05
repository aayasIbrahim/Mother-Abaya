"use server";
import connectDB from "@/libs/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

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
