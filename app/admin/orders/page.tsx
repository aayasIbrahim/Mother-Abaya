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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Order Mangement
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage your Mother Abaya Order
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#B3589D] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#a04a8b] transition-all shadow-lg">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Table Component */}
      <OrderTable orders={orders} />

      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
