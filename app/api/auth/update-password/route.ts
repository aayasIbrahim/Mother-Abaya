import { authOptions } from '@/libs/authOption';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/libs/db";


export async function PUT(req: NextRequest) { 
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    // Basic Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ message: "সবগুলো ঘর পূরণ করুন!" }, { status: 400 });
    }

    await connectDB();

    // ইউজার খুঁজে বের করা
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "ইউজার খুঁজে পাওয়া যায়নি!" }, { status: 404 });
    }

    // পাসওয়ার্ড ভ্যালিডেশন
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return NextResponse.json({ message: "বর্তমান পাসওয়ার্ড ভুল!" }, { status: 400 });
    }

    // নতুন পাসওয়ার্ড হ্যাশ করে সেভ করা
    const hashedPassword = await bcrypt.hash(newPassword, 12); // রাউন্ড ১২ দিলে বেশি সিকিউর হয়
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!" });
  } catch (error) {
    console.error("Password Update Error:", error);
    return NextResponse.json({ message: "সার্ভারে সমস্যা হয়েছে!" }, { status: 500 });
  }
}