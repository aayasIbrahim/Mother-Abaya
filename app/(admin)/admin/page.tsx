// app/(admin)/admin/page.tsx
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Package
} from "lucide-react";
import connectDB from "@/libs/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User"; // যদি ইউজার মডেল থাকে

export default async function AdminDashboard() {
  await connectDB();

  // ১. সব ডেটা একসাথে আনা (Performance Optimized)
  const [orders, products, totalOrdersCount] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).limit(5).lean(), // Recent 5 orders
    Product.find().lean(),
    Order.countDocuments(),
  ]);

  // ২. মোট বিক্রয় (Total Revenue) ক্যালকুলেট করা
  const revenueData = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } }, // ক্যানসেল হওয়া অর্ডার বাদ দিয়ে
    { $group: { _id: null, total: { $sum: "$totalAmount" } } }
  ]);
  const totalRevenue = revenueData[0]?.total || 0;

  // ৩. লো স্টক প্রোডাক্ট ফিল্টার (Stock < 5)
  const lowStockProducts = products.filter(p => p.stock < 5);

  // ৪. স্ট্যাটাস কার্ড অ্যারে
  const stats = [
    { 
      title: "Total Revenue", 
      value: `৳ ${totalRevenue.toLocaleString()}`, 
      info: "Lifetime earnings", 
      icon: DollarSign, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      title: "Total Orders", 
      value: totalOrdersCount.toString(), 
      info: "All time orders", 
      icon: ShoppingBag, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      title: "Products", 
      value: products.length.toString(), 
      info: "Items in shop", 
      icon: Package, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
    { 
      title: "Low Stock", 
      value: lowStockProducts.length.toString(), 
      info: "Immediate restock needed", 
      icon: AlertTriangle, 
      color: "text-rose-600", 
      bg: "bg-rose-50" 
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-0">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Real-time Store Performance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.title} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className={`${s.bg} ${s.color} w-fit p-3 rounded-2xl mb-4`}>
              <s.icon size={20} />
            </div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{s.title}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{s.value}</h3>
            <p className="text-[10px] text-gray-400 mt-2 font-bold italic">{s.info}</p>
          </div>
        ))}
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black uppercase italic tracking-tighter mb-6">Recent Activities</h3>
          <div className="space-y-3">
            {orders.map((order: any) => (
              <div key={order._id.toString()} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl border flex items-center justify-center font-bold text-[10px] text-gray-400">
                    #{order._id.toString().slice(-4).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{order.customer?.name}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase">{order.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">৳{order.totalAmount}</p>
                  <p className="text-[9px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store Health / Stock Alerts */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black uppercase italic tracking-tighter mb-6">Inventory Health</h3>
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((p: any) => (
                <div key={p._id.toString()} className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <p className="text-[10px] text-rose-600 font-black uppercase">Critical Stock</p>
                  <p className="text-sm font-bold text-rose-900 mt-1">{p.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-bold text-rose-700/70 uppercase">Only {p.stock} left</span>
                    <div className="h-1.5 w-20 bg-rose-200 rounded-full overflow-hidden">
                       <div className="h-full bg-rose-600" style={{ width: `${(p.stock/20)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-emerald-50 rounded-3xl border border-emerald-100">
                <p className="text-emerald-600 font-bold text-sm">All products are well stocked! ✅</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}