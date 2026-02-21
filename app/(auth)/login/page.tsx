"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#FDF7FB] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-pink-100/50 overflow-hidden border border-white">
        
        {/* Header Section */}
        <div className="bg-[#B3589D] p-10 text-center text-white">
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-pink-100 text-sm font-medium">Please login to your Mother Abaya account</p>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link href="#" className="text-xs font-bold text-[#B3589D] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
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

            {/* Login Button */}
            <button className="w-full bg-[#B3589D] text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:bg-[#a04a8b] hover:shadow-pink-300 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <LogIn size={20} />
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#B3589D] font-black hover:underline underline-offset-4">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;