"use server";
import connectDB from "@/libs/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const registerUser = async (formData: FormData) => {
  try {
    await connectDB();
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;
    const phone = formData.get("phone") as string;

    if (!name || !email || !password) {
      return { error: "All fields are required" };
    }
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }
    // ইউজার অলরেডি আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "Email already exists" };

    // পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "user",
    });
    return { success: "Account created successfully" };
  } catch (error) {
    return { error: "Registration failed" };
  }
};
