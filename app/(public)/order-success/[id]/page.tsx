import connectDB from "@/libs/db";
import Order from "@/models/Order";
import { CheckCircle2, Package, Truck, Phone } from "lucide-react";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ id: string }>;
} 

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id).populate("items.product");
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border p-8 md:p-12">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Order Confirmed!
          </h1>
          <p className="text-gray-500">
            Thank you, {order.customer.name}. Your order has been placed.
          </p>
          <div className="text-xs font-mono bg-gray-100 inline-block px-3 py-1 rounded-full uppercase">
            Order ID: {order._id.toString()}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t pt-10">
          {/* Shipping Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase flex items-center gap-2">
              <Truck size={16} /> Shipping Details
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-black">{order.customer.name}</p>
              <p>
                {order.customer.address}, {order.customer.city}
              </p>
              <p className="flex items-center gap-1">
                <Phone size={12} /> {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase flex items-center gap-2">
              <Package size={16} /> Summary
            </h3>
            <div className="space-y-2">
              {order.items.map((item: any) => (
                <div key={item._id} className="flex justify-between text-xs">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span className="font-bold">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-black text-lg">
                <span>Total</span>
                <span className="text-[#B3589D]">৳{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
