import mongoose from "mongoose";
import connectDB from "@/libs/db";
import Order from "@/models/Order";
import { CheckCircle2, Package, Truck, Phone, Calendar, CreditCard, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  await connectDB();
  const order = await Order.findById(id).lean();

  if (!order) return notFound();

  return (
    <div className="min-h-screen bg-[#FFF5F9] py-12 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-xl border border-pink-50 overflow-hidden">
        
        {/* Top Celebration Section */}
        <div className="bg-gradient-to-b from-pink-50 to-white p-10 text-center border-b border-pink-50">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6 animate-bounce">
            <CheckCircle2 size={48} className="text-[#B3589D]" />
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900">
            Order <span className="text-[#B3589D]">Placed!</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Alhamdulillah, {order.customer.name.split(' ')[0]}! We've received your order.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
            ID: #{order._id.toString().slice(-8).toUpperCase()}
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Shipping Info */}
            <div className="space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 border-b pb-2">
                <Truck size={14} className="text-[#B3589D]" /> Shipping Details
              </h3>
              <div className="space-y-3">
                <p className="text-sm font-black text-gray-900 uppercase leading-tight">
                  {order.customer.name}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {order.customer.address}, <br />
                  <span className="font-bold text-gray-800">{order.customer.city}</span>
                </p>
                <p className="flex items-center gap-2 text-sm font-bold text-gray-500">
                  <Phone size={14} className="text-[#B3589D]" /> {order.customer.phone}
                </p>
              </div>
            </div>

            {/* Order Summary & Payment */}
            <div className="space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 border-b pb-2">
                <Package size={14} className="text-[#B3589D]" /> Summary & Payment
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Calendar size={14} /> 
                  {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600 uppercase">
                  <CreditCard size={14} /> 
                  Method: <span className="text-blue-600">{order.paymentMethod}</span>
                </div>
                
                {/* Product Mini List */}
                <div className="pt-2 space-y-1">
                   {order.items.map((item: any, idx: number) => (
                     <div key={idx} className="flex justify-between text-[11px] font-bold text-gray-400 uppercase">
                        <span>{item.name} x{item.quantity}</span>
                        <span>৳{item.price * item.quantity}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Calculation Section */}
          <div className="bg-gray-50 p-6 rounded-3xl space-y-3">
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
              <span>Subtotal</span>
              <span>৳{order.subtotal?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
              <span>Shipping Fee</span>
              <span>৳{order.shippingCost?.toLocaleString() || 0}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4 flex justify-between items-center">
              <span className="text-lg font-black uppercase italic text-gray-900">Total Amount</span>
              <span className="text-2xl font-black text-[#B3589D]">৳{order.totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/" 
              className="flex-1 bg-pink-900 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-500 transition-all text-xs"
            >
              Continue Shopping
            </Link>
            <Link 
              href={`/track-order/${order._id}`}
              className="flex-1 border-2 border-gray-100 text-center py-4 rounded-2xl font-black uppercase tracking-widest hover:border-[#B3589D] hover:text-[#B3589D] transition-all text-xs flex items-center justify-center gap-2"
            >
              Track Order <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}