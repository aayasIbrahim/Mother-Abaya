import { Settings, Save, Truck, CreditCard, Globe, BellRing } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 flex items-center gap-2">
            <Settings size={32} /> Store Settings
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase mt-1">Configure your shop's core behavior</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Shipping Configuration */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4">
            <Truck size={20} className="text-[#B3589D]" /> Shipping Charges
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Inside Dhaka (৳)</label>
              <input type="number" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-[#B3589D]" placeholder="80" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Outside Dhaka (৳)</label>
              <input type="number" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-[#B3589D]" placeholder="150" />
            </div>
          </div>
        </div>

        {/* Payment & Contact */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4">
            <CreditCard size={20} className="text-[#B3589D]" /> Payment Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">bKash Personal Number</label>
              <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-[#B3589D]" placeholder="017XXXXXXXX" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Support Email</label>
              <input type="email" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-[#B3589D]" placeholder="support@motherabaya.com" />
            </div>
          </div>
        </div>

        {/* Store Status / Maintenance */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm md:col-span-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl">
              <BellRing size={24} />
            </div>
            <div>
              <h3 className="font-black uppercase text-sm">Maintenance Mode</h3>
              <p className="text-xs text-gray-400 font-bold">Stop taking new orders temporarily</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#B3589D]"></div>
          </label>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
  
  {/* Announcement Bar Settings */}
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
    <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4 text-rose-500">
      <Globe size={20} /> Announcement Bar
    </h2>
    <div className="space-y-4">
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Banner Message</label>
        <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-sm" placeholder="Free shipping on orders over ৳2000!" />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
        <span className="text-xs font-black uppercase">Show Banner on Site</span>
        <input type="checkbox" className="w-5 h-5 accent-[#B3589D]" />
      </div>
    </div>
  </div>

  {/* Inventory & Alerts */}
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
    <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4 text-orange-500">
      <BellRing size={20} /> Inventory Alerts
    </h2>
    <div className="space-y-4">
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Low Stock Threshold</label>
        <div className="flex items-center gap-3">
          <input type="number" className="w-24 bg-gray-50 border-none rounded-2xl p-4 font-bold" placeholder="5" />
          <span className="text-[10px] font-bold text-gray-400 uppercase">Units left</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 italic">Admin will be notified when stock hits this number.</p>
    </div>
  </div>

  {/* Social Links (Full Width) */}
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm md:col-span-2 space-y-6">
    <h2 className="text-lg font-black uppercase flex items-center gap-2 border-b pb-4">
      Connect Channels
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Facebook Page URL</label>
        <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-xs" placeholder="facebook.com/motherabaya" />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Instagram Handle</label>
        <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-xs" placeholder="@motherabaya" />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">WhatsApp Business</label>
        <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-xs" placeholder="+88017XXXXXXXX" />
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}