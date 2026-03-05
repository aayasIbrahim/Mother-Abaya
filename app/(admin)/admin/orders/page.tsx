import Link from "next/link";
import Order from "@/models/Order";
import connectDB from "@/libs/db";
import { Eye, Phone, Calendar } from "lucide-react";
import StatusSelector from "@/components/admin/StatusSelector";
import DeleteOrderBtn from "@/components/admin/DeleteOrderBtn";

export default async function AdminOrdersPage() {
  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-7xl mx-auto">
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

      <div className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100 uppercase text-[10px] font-black text-gray-500">
            <tr>
              <th className="px-6 py-4">Order Info</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order: any) => (
              <tr
                key={order._id.toString()}
                className="hover:bg-gray-50/30 transition-colors group"
              >
                {/* অর্ডার আইডি এবং ডেট */}
                <td className="px-6 py-4">
                  <div className="font-mono text-[11px] text-gray-900 font-bold">
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 font-medium">
                    <Calendar size={10} />
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </td>

                {/* কাস্টমার ইনফো */}
                <td className="px-6 py-4">
                  <div className="font-bold text-xs uppercase text-gray-800">
                    {order.customer?.name}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] font-semibold mt-1">
                    <Phone size={10} /> {order.customer?.phone}
                  </div>
                </td>

                {/* প্রাইস */}
                <td className="px-6 py-4">
                  <div className="font-black text-sm text-gray-900">
                    ৳{order.totalAmount?.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-0.5">
                    {order.paymentMethod}
                  </div>
                </td>

                {/* স্ট্যাটাস */}
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                {/* অ্যাকশনস */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <StatusSelector
                      orderId={order._id.toString()}
                      currentStatus={order.status}
                    />
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="p-2 hover:bg-gray-100 text-gray-400 hover:text-black rounded-full transition-all"
                    >
                      <Eye size={16} />
                    </Link>
                    <DeleteOrderBtn orderId={order._id.toString()} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// প্রফেশনাল স্ট্যাটাস ব্যাজ
const StatusBadge = ({ status }: { status: string }) => {
  const configs: any = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    processing: "bg-blue-50 text-blue-600 border-blue-100",
    shipped: "bg-purple-50 text-purple-600 border-purple-100",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
        configs[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};
