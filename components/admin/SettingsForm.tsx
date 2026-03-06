"use client";

import React, { useTransition } from "react";
import {
  Settings, Save, Truck, CreditCard, Globe, BellRing, 
  ShieldCheck, Loader2 
} from "lucide-react";
import { updateStoreSettings } from "@/libs/actions/settings";
import { toast } from "react-hot-toast";

export default function SettingsForm({ settings }: { settings: any }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateStoreSettings(formData);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      // Key যোগ করা হয়েছে যাতে সেভ হওয়ার পর ইনপুটগুলো ফ্রেশ ডাটা দিয়ে আপডেট হয়
      key={settings?.updatedAt || settings?._id || "initial"}
      className="p-6 md:p-10 max-w-6xl mx-auto space-y-12 bg-[#FDF7FB] min-h-screen"
    >
      {/* --- TOP HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sticky top-0 z-10 bg-[#FDF7FB]/80 backdrop-blur-md py-4">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 flex items-center gap-3">
            <Settings size={38} className="text-[#B3589D]" /> Control Center
          </h1>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
            isPending ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-[#B3589D]"
          }`}
        >
          {isPending ? (
            <><Loader2 size={18} className="animate-spin" /> Syncing...</>
          ) : (
            <><Save size={18} /> Sync All Changes</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logistics Section */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 md:col-span-2">
          <h2 className="text-xl font-black uppercase flex items-center gap-3 border-b pb-6">
            <Truck size={24} className="text-[#B3589D]" /> Logistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 ml-2">Inside Dhaka (৳)</label>
              <input name="insideDhaka" defaultValue={settings?.insideDhaka ?? 80} type="number" className="w-full bg-gray-50 rounded-2xl p-5 font-black text-lg outline-none" />
            </div>
            <div className="group">
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-3 ml-2">Outside Dhaka (৳)</label>
              <input name="outsideDhaka" defaultValue={settings?.outsideDhaka ?? 150} type="number" className="w-full bg-gray-50 rounded-2xl p-5 font-black text-lg outline-none" />
            </div>
          </div>
        </div>

        {/* Payout Section */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <h2 className="text-xl font-black uppercase flex items-center gap-3 border-b pb-6">
            <CreditCard size={24} className="text-[#B3589D]" /> Payout
          </h2>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-400 block ml-2">bKash Number</label>
            <input name="bkashNumber" defaultValue={settings?.bkashNumber || ""} type="text" className="w-full bg-gray-50 rounded-2xl p-4 font-black text-sm outline-none" />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-1 md:col-span-3 rounded-[3rem] shadow-xl overflow-hidden">
          <div className="bg-white p-8 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-rose-50 text-rose-500 rounded-[2rem]"><BellRing size={32} /></div>
              <div><h3 className="font-black uppercase text-lg italic">Emergency Maintenance Mode</h3></div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-125 md:mr-8">
              <input name="maintenanceMode" defaultChecked={Boolean(settings?.maintenanceMode ?? false)} type="checkbox" className="sr-only peer" />
              <div className="w-16 h-9 bg-gray-200 rounded-full peer peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-[4.5px] after:left-[4.5px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-rose-500 shadow-inner"></div>
            </label>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4 text-pink-600"><Globe size={20} /> News</h2>
          <textarea name="announcementText" defaultValue={settings?.announcementText || ""} rows={2} className="w-full bg-gray-50 rounded-2xl p-4 font-bold text-xs resize-none outline-none" />
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="text-[11px] font-black uppercase">Publish Banner</span>
            <input name="showAnnouncement" defaultChecked={Boolean(settings?.showAnnouncement ?? false)} type="checkbox" className="w-6 h-6 accent-[#B3589D]" />
          </div>
        </div>

        {/* Social Channels */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 md:col-span-2">
          <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4 text-blue-600"><ShieldCheck size={20} /> Social Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="facebookUrl" defaultValue={settings?.facebookUrl || ""} placeholder="Facebook URL" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none" />
            <input name="instagramUrl" defaultValue={settings?.instagramUrl || ""} placeholder="Instagram URL" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none" />
            <input name="whatsappNumber" defaultValue={settings?.whatsappNumber || ""} placeholder="WhatsApp Number" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none" />
            <input name="supportEmail" defaultValue={settings?.supportEmail || ""} placeholder="Support Email" className="w-full bg-gray-50 rounded-2xl p-4 text-xs font-bold outline-none" />
          </div>
        </div>
      </div>
    </form>
  );
}