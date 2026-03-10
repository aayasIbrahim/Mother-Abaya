import connectDB from "@/libs/db";
import Order from "@/models/Order";
import OrderTable from "@/components/admin/OrderTable";
import Pagination from "@/components/admin/Pagination";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await connectDB();
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  //  ডাটাবেস থেকে ডাটা এবং টোটাল কাউন্ট একসাথে আনা (Performance optimized)
  const [orders, totalOrders] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalOrders / limit);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-8 transition-all">
        {/* Left Side: Title & Counter Badge */}
        <div className="space-y-2 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              Order Management
            </h1>
            {/* Dynamic Status Badge */}
            <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border border-amber-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
              Total Orders: {totalOrders}
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Monitor and process your Mother Abaya customer orders
          </p>
        </div>

        {/* Right Side: Quick Action (Optional - e.g., Filter or Export) */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#B3589D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#a04a8b] active:scale-95 transition-all shadow-lg shadow-pink-100">
            Export Report
          </button>
        </div>
      </div>

      {/* Table Component */}
      <OrderTable orders={orders} />

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
