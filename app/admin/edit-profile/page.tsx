"use client";
import React, { useState } from "react";
import { User, Lock, ShieldCheck, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { updateProfileAction } from "@/libs/actions/user";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setLoading(true);
    const result = await updateProfileAction(formData);
    
    if (result?.error) {
      toast.error(result.error);
    } else {
      // NextAuth সেশন আপডেট করা যাতে হেডারে নাম চেঞ্জ হয়
      const newName = formData.get("name") as string;
      await update({ name: newName });
      
      toast.success(result.success);
      (document.getElementById("profile-form") as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter">Edit Profile</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Manage account and security</p>
      </div>

      <form id="profile-form" action={clientAction} className="space-y-6">
        {/* General Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-[#B3589D]">
              <User size={20} />
            </div>
            <h3 className="font-black uppercase text-sm text-gray-700">General Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
              <input 
                name="name"
                type="text" 
                defaultValue={session?.user?.name || ""}
                required
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email (Fixed)</label>
              <input 
                disabled
                value={session?.user?.email || ""}
                className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-400 cursor-not-allowed outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black uppercase text-sm text-gray-700">Change Password</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  name="newPassword"
                  type="password" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                  placeholder="Leave blank to keep same"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  name="confirmPassword"
                  type="password" 
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#B3589D] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-pink-100 hover:bg-[#9a4a86] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Updating..." : <><Save size={18} /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}