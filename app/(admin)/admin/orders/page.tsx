import Link from "next/link";
import Order from "@/models/Order";
import connectDB from "@/libs/db";
import { Eye, Phone, Calendar } from "lucide-react";
import StatusSelector from "@/components/admin/StatusSelector";

export default async function AdminOrdersPage() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black uppercase mb-6">Order Management</h1>

      <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b uppercase text-[10px] font-black">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                {/* অর্ডার আইডি এবং ডেট */}
                <td className="px-6 py-4">
                  <div className="font-mono text-[11px] text-gray-400 font-bold uppercase">
                    #{order._id.toString().slice(-8)}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                    <Calendar size={10} />{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>

                {/* কাস্টমার ইনফো */}
                <td className="px-6 py-4">
                  <div className="font-black text-xs uppercase italic tracking-tight text-gray-800">
                    {order.customer.name}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold mt-1">
                    <Phone size={10} /> {order.customer.phone}
                  </div>
                </td>

                {/* টোটাল প্রাইস */}
                <td className="px-6 py-4">
                  <div className="font-black text-sm text-[#B3589D]">
                    ৳{order.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
                    {order.paymentMethod}
                  </div>
                </td>

                {/* স্ট্যাটাস ব্যাজ */}
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                {/* অ্যাকশন এবং ড্রপডাউন */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {/* স্ট্যাটাস আপডেট ড্রপডাউন */}
                    <StatusSelector
                      orderId={order._id.toString()}
                      currentStatus={order.status}
                    />

                    {/* ডিটেইলস পেজে যাওয়ার বাটন */}
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="p-2 hover:bg-black hover:text-white rounded-full transition-all text-gray-400 group-hover:text-black"
                      title="View Full Details"
                    >
                      <Eye size={16} />
                    </Link>
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

const StatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    pending: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colors[status]}`}
    >
      {status}
    </span>
  );
};
