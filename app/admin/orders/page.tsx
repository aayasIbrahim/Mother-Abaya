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

  const [orders, totalOrders] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Order.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalOrders / limit);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 italic tracking-tighter uppercase">
            Order Log
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
            Mother Abaya Management System
          </p>
        </div>
        <div className="bg-[#B3589D] text-white px-8 py-4 rounded-2xl font-black  shadow-lg shadow-pink-100">
          TOTAL: {totalOrders}
        </div>
      </div>

      {/* Table Component */}
      <OrderTable orders={orders} />

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
