import { Calendar, Phone, Eye } from "lucide-react";
import Link from "next/link";
import StatusSelector from "./StatusSelector";
import DeleteOrderBtn from "./DeleteOrderBtn";

const StatusBadge = ({ status }: { status: string }) => {
  const configs: any = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    processing: "bg-blue-50 text-blue-600 border-blue-100",
    shipped: "bg-purple-50 text-purple-600 border-purple-100",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${configs[status] || "bg-gray-50 text-gray-600"}`}>
      {status}
    </span>
  );
};

export default function OrderTable({ orders }: { orders: any[] }) {
  return (
    <div className="overflow-hidden bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50 border-b border-gray-100 uppercase text-[10px] font-black text-gray-400 tracking-widest">
          <tr>
            <th className="px-6 py-5">Order Detail</th>
            <th className="px-6 py-5">Customer Info</th>
            <th className="px-6 py-5">Amount</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order._id.toString()} className="hover:bg-pink-50/10 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-mono text-[11px] text-gray-900 font-bold tracking-tighter">
                  #{order._id.toString().slice(-8).toUpperCase()}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 font-bold">
                  <Calendar size={10} /> {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-black text-xs uppercase text-gray-800 tracking-tight">{order.customer?.name}</div>
                <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold mt-1">
                  <Phone size={10} /> {order.customer?.phone}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-black text-sm text-gray-900">৳{order.totalAmount?.toLocaleString()}</div>
                <div className="text-[9px] text-[#B3589D] uppercase font-black tracking-widest mt-0.5">{order.paymentMethod}</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3">
                  <StatusSelector orderId={order._id.toString()} currentStatus={order.status} />
                  <Link href={`/admin/orders/${order._id}`} className="p-2 bg-gray-50 text-gray-400 hover:text-[#B3589D] hover:bg-pink-50 rounded-xl transition-all border border-transparent hover:border-pink-100">
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
  );
}