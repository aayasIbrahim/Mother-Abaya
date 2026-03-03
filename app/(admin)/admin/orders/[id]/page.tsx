import connectDB from "@/libs/db";
import Order from "@/models/Order";
import { notFound } from "next/navigation";
import { Package, User, MapPin, CreditCard, Clock } from "lucide-react";
import StatusSelector from "@/components/admin/StatusSelector";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  // প্রোডাক্টের ডিটেইলস সহ অর্ডারটি নিয়ে আসা
  const order = await Order.findById(id).populate("items.product");

  if (!order) notFound();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* হেডার: অর্ডার আইডি এবং কুইক স্ট্যাটাস */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">
            Order #{order._id.toString().slice(-8)}
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-[10px] font-black uppercase rounded-lg hover:bg-gray-200">
            Print Invoice
          </button>
          <StatusSelector
            orderId={order._id.toString()}
            currentStatus={order.status}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* বাম পাশ: প্রোডাক্ট লিস্ট (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center gap-2 font-black text-xs uppercase italic">
              <Package size={14} /> Items Ordered
            </div>
            <div className="divide-y">
              {order.items.map((item: any) => (
                <div key={item._id} className="p-4 flex gap-4 items-center">
                  <img
                    src={item.product?.images[0] || "/placeholder.jpg"}
                    className="w-12 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold uppercase">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-black text-[#B3589D]">
                    ৳{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50/50 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                <span>Subtotal</span>
                <span>৳{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-lg font-black uppercase italic border-t pt-2">
                <span>Total Amount</span>
                <span className="text-[#B3589D]">৳{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ডান পাশ: কাস্টমার এবং পেমেন্ট ডিটেইলস (Sidebar) */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase italic flex items-center gap-2 border-b pb-2">
              <User size={14} /> Customer Info
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Name
                </p>
                <p className="text-sm font-bold">{order.customer.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400" />
                <p className="text-xs text-gray-600">
                  {order.customer.address}, {order.customer.city}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase italic flex items-center gap-2 border-b pb-2">
              <CreditCard size={14} /> Payment Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span className="text-gray-400">Method:</span>
                <span className="text-blue-600">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-600">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
