import connectDB from "@/libs/db";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import { Package, User, MapPin, CreditCard, Calendar, Phone, ChevronLeft, Printer } from "lucide-react";
import StatusSelector from "@/components/admin/StatusSelector";
import Link from "next/link";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();
  
  await connectDB();

  const order = await Order.findById(id).populate("items.product").lean();

  if (!order) notFound();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Navigation & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link 
          href="/admin/orders" 
          className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 hover:text-[#B3589D] transition-all"
        >
          <ChevronLeft size={16} /> Back to Orders
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[10px] font-black uppercase rounded-xl hover:bg-gray-50 shadow-sm transition-all">
            <Printer size={14} /> Print Invoice
          </button>
          <StatusSelector
            orderId={order._id.toString()}
            currentStatus={order.status}
          />
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
            Order <span className="text-[#B3589D]">#{order._id.toString().slice(-8).toUpperCase()}</span>
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-gray-400 font-bold uppercase mt-1">
            <Calendar size={12} /> {new Date(order.createdAt).toLocaleString("en-GB")}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Current Status</span>
          <span className="px-4 py-1.5 bg-pink-50 text-[#B3589D] border border-pink-100 rounded-full text-[10px] font-black uppercase">
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Order Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-black text-xs uppercase italic flex items-center gap-2 text-gray-800">
                <Package size={16} className="text-[#B3589D]" /> Items in Order
              </h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase">{order.items.length} Products</span>
            </div>
            
            <div className="divide-y divide-gray-50 px-6">
              {order.items.map((item: any) => (
                <div key={item._id} className="py-6 flex gap-6 items-center group">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <img
                      src={item.product?.images?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl bg-gray-50 shadow-sm transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold uppercase text-gray-800 leading-tight">{item.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-black uppercase">
                      <span className="text-gray-400">Size: <span className="text-gray-900">{item.size}</span></span>
                      <span className="text-gray-400">Qty: <span className="text-gray-900">{item.quantity}</span></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">৳{item.price.toLocaleString()} / unit</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Section */}
            <div className="p-8 bg-gray-50/50 border-t border-gray-50 space-y-3">
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                <span>Items Subtotal</span>
                <span className="text-gray-900">৳{order.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase">
                <span>Shipping Charge</span>
                <span className="text-gray-900">৳{order.shippingCost?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-black uppercase italic border-t border-gray-200 pt-4 mt-2">
                <span className="text-gray-800">Total Paid</span>
                <span className="text-[#B3589D]">৳{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Customer & Shipping Sidebar */}
        <div className="space-y-6">
          {/* Customer Info Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase italic flex items-center gap-2 border-b border-gray-50 pb-4 text-gray-800">
              <User size={16} className="text-[#B3589D]" /> Customer Profile
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                <p className="text-sm font-bold uppercase text-gray-900 mt-0.5">{order.customer.name}</p>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#B3589D] group-hover:bg-[#B3589D] group-hover:text-white transition-all">
                  <Phone size={14} />
                </div>
                <p className="text-sm font-bold text-gray-700">{order.customer.phone}</p>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#B3589D] flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Shipping Address</label>
                  <p className="text-xs font-bold text-gray-600 leading-relaxed mt-1">
                    {order.customer.address}<br />
                    <span className="text-[#B3589D]">{order.customer.city}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Status Card */}
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase italic flex items-center gap-2 border-b border-gray-50 pb-4 text-gray-800">
              <CreditCard size={16} className="text-[#B3589D]" /> Transaction
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-[10px] font-bold uppercase text-gray-400">Method</span>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-[10px] font-bold uppercase text-gray-400">Status</span>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                  order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
              {order.notes && (
                <div className="mt-4">
                  <span className="text-[9px] font-black uppercase text-gray-400 block mb-1">Customer Note</span>
                  <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-800 italic border border-amber-100">
                    "{order.notes}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}