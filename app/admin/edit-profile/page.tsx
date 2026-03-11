"use client";
import React, { useState, useTransition } from "react";
import { User, Save, Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { updateProfileAction } from "@/actions/user.actions";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function clientAction(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await updateProfileAction(formData);

        if (result?.error) {
          toast.error(result.error);
        } else if (result?.success) {
          const newName = formData.get("name") as string;
          const newPhone = formData.get("phone") as string;

          // built in সেশন আপডেট করুন
          await update({
            name: newName,
            phone: newPhone,
          });

          // সেশন আপডেটের পর টোস্ট দিন
          toast.success(result.success);

          const form = document.getElementById(
            "profile-form",
          ) as HTMLFormElement;
          if (form) form.reset();
        }
      } catch (err) {
        toast.error("Somethings Wrong");
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-800 uppercase italic tracking-tighter">
          Edit Profile
        </h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
          Manage account and security
        </p>
      </div>

      <form id="profile-form" action={clientAction} className="space-y-6">
        {/* General Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-[#B3589D]">
              <User size={20} />
            </div>
            <h3 className="font-black uppercase text-sm text-gray-700">
              General Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                defaultValue={session?.user?.name || ""}
                required
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Email (Fixed)
              </label>
              <input
                disabled
                value={session?.user?.email || ""}
                className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-400 cursor-not-allowed outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  name="phone"
                  type="text"
                  defaultValue={session?.user?.phone || ""}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                  placeholder="+880 1XXX XXXXXX"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black uppercase text-sm text-gray-700">
              Security & Password
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Current Password - Full Width for emphasis */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Current Password (Required)
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  name="oldPassword"
                  type={showOld ? "text" : "password"}
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-12 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                  placeholder="Enter current password to verify"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B3589D] transition-colors"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={18}
                  />
                  <input
                    name="newPassword"
                    type={showNew ? "text" : "password"}
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-12 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="Leave blank to keep same"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B3589D]"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={18}
                  />
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-12 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-200 transition-all outline-none"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#B3589D]"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#B3589D] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-pink-100 hover:bg-[#9a4a86] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              "Updating..."
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
