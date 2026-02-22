"use client";
import React, { useState } from "react";
import { registerUser } from "./actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await registerUser(formData);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF7FB] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl shadow-pink-100/50 overflow-hidden border border-white">
        {/* Header Section */}
        <div className="bg-[#B3589D] p-10 text-center text-white">
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-pink-100 text-sm font-medium">
            Join Mother Abaya family today
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleRegister}>
            {/*  Full Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] transition-all text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B3589D] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center gap-2 ml-1 py-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#B3589D]"
                id="terms"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-500 font-medium"
              >
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-[#B3589D] font-bold hover:underline"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#B3589D] font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#B3589D] text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-[#a04a8b] hover:shadow-pink-300 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#B3589D] font-black hover:underline underline-offset-4"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
