// app/(admin)/admin/page.tsx
export default function AdminDashboard() {
  const stats = [
    { title: "Total Sales", value: "৳ 1,25,000", change: "+12%" },
    { title: "New Orders", value: "45", change: "+5%" },
    { title: "Total Customers", value: "1,200", change: "+18%" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.title} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{s.title}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-black text-gray-800">{s.value}</h3>
              <span className="text-green-500 text-xs font-bold">{s.change}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* এখানে প্রোডাক্ট লিস্ট বা রিসেন্ট অর্ডার এর টেবিল বসবে */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm min-h-[400px]">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activities</h3>
        <p className="text-gray-400">আপনার শপ এর সব ডেটা এখানে ম্যানেজ করুন...</p>
      </div>
    </div>
  );
}