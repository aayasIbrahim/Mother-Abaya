"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Users, Settings, LogOut, ChevronDown } from "lucide-react";

interface AdminProfileProps {
  session: any;
}

export default function AdminProfile({ session }: AdminProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // বাইরের কোথাও ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative group ref={dropdownRef}">
      {/* --- Profile Trigger --- */}
      <div
        className="flex items-center gap-3 md:gap-4 cursor-pointer p-1 rounded-2xl transition-all duration-300 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 md:gap-6">
          <div className="text-right  sm:block">
            <p className="text-sm font-bold text-gray-800">
              {session?.user?.name || "Admin Panel"}
            </p>
            <p className="text-[10px] text-[#B3589D] font-black uppercase tracking-widest">
              Admin
            </p>
          </div>
          <div className="w-11 h-11 bg-gradient-to-tr from-[#B3589D] to-pink-400 rounded-2xl flex items-center justify-center text-white shadow-md shadow-pink-100">
            <Users size={20} />
          </div>
        </div>

        {/* Avatar with Initials */}
      </div>

      {/* --- Dropdown Menu --- */}
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-[1.8rem] shadow-2xl border border-pink-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform origin-top-right group-hover:translate-y-0 translate-y-2 p-2">
        <div className="px-4 py-4 border-b border-gray-50 mb-1 bg-pink-50/30 rounded-t-[1.3rem]">
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Authenticated as
          </p>
          <p className="text-xs font-bold text-gray-800 truncate">
            {session?.user?.email || "admin@motherabaya.com"}
          </p>
        </div>

        <div className="space-y-1 mt-1">
          <Link
            href="/admin/edit-profile"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-pink-50 hover:text-[#B3589D] rounded-xl transition-all"
          >
            <Users
              size={15}
              className="text-gray-400 group-hover:text-[#B3589D]"
            />
            Edit Profile
          </Link>

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-pink-50 hover:text-[#B3589D] rounded-xl transition-all"
          >
            <Settings
              size={15}
              className="text-gray-400 group-hover:text-[#B3589D]"
            />
            Settings
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all mt-1"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
