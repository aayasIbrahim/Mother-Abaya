"use client";
import React, { useState, useTransition } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Truck, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { createOrderAction } from "@/libs/actions/order";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [isPending, startTransition] = useTransition();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cart, clearCart, getTotalPrice } = useCartStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData);

    // সার্ভারের জন্য ডাটা ফরম্যাট
    const orderData = {
      ...rawData,
      paymentMethod, // আপনার স্টেট থেকে আসা পেমেন্ট মেথড
      items: cart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        size: item.size,
      })),
    };

    // startTransition এর ভেতরে সার্ভার অ্যাকশন কল করুন
    startTransition(async () => {
      try {
        const result = await createOrderAction(orderData);

        if (result.success) {
          toast.success(result.message || "Order placed successfully!");
          clearCart();

          if (result.url) {
            window.location.href = result.url; // পেমেন্ট গেটওয়েতে রিডাইরেক্ট
          } else {
            router.push(`/order-success/${result.orderId}`); // সাকসেস পেজে নেভিগেট
          }
        } else {
          toast.error(result.error || "Failed to place order");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#D1A3C4]/30 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* বাম পাশ: শিপিং ডিটেইলস */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-white/50">
          <h2 className="text-2xl font-black text-gray-800 mb-8 uppercase tracking-tight italic">
            Billing & Shipping
          </h2>

          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:gap-4">
              <InputField
                label="Full Name"
                name="name"
                required
                placeholder="Enter your name"
              />
              <InputField
                label="Street Address"
                name="address"
                required
                placeholder="House no, street name, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                  State / City *
                </label>
                <select
                  name="city"
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#B3589D] text-sm"
                >
                  <option value="">Select City</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                </select>
              </div>
              <InputField
                label="Phone Number"
                name="phone"
                required
                placeholder="017XXXXXXXX"
              />
            </div>

            <InputField
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="email@example.com"
            />

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#B3589D] text-sm"
                placeholder="Notes about your order..."
              ></textarea>
            </div>
          </form>
        </div>

        {/* ডান পাশ: অর্ডার সামারি এবং পেমেন্ট */}
        <div className="w-full lg:w-[450px] space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/50">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-800 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <span className="absolute -top-0 -right-0 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-800 uppercase">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                      Size: {item.size}
                    </p>

                    {/* ১. বর্তমান দাম (ডিসকাউন্ট থাকলে সেটা, না থাকলে আসলটা) */}
                    <p className="text-xs font-black text-gray-900">
                      ৳
                      {(item.discountPrice > 0
                        ? item.discountPrice
                        : item.price
                      ).toLocaleString()}
                    </p>

                    {/* ২. যদি ডিসকাউন্ট থাকে, তবে আগের দামটি ছোট করে কেটে দেখানো (Industry Standard) */}
                    {item.discountPrice > 0 &&
                      item.discountPrice < item.price && (
                        <p className="text-[10px] text-pink-900 font-bold line-through">
                          ৳{item.price.toLocaleString()}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-50 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-bold uppercase text-[10px]">
                  Subtotal
                </span>
                <span className="font-bold">
                  ৳{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black border-t border-gray-50 pt-3">
                <span className="text-gray-800 uppercase tracking-tighter italic">
                  Total
                </span>
                <span className="text-[#B3589D]">
                  ৳{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* পেমেন্ট মেথড সেকশন */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/50 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Select Payment Method
            </h3>

            <PaymentOption
              id="cod"
              label="Cash On Delivery"
              icon={<Truck size={18} />}
              active={paymentMethod === "cod"}
              onClick={() => setPaymentMethod("cod")}
            />
            <PaymentOption
              id="bkash"
              label="bKash / Mobile Banking"
              icon={<Smartphone size={18} />}
              active={paymentMethod === "bkash"}
              onClick={() => setPaymentMethod("bkash")}
            />
            <PaymentOption
              id="card"
              label="Credit / Debit Card"
              icon={<CreditCard size={18} />}
              active={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
            />

            <div className="pt-4">
              <button
                type="submit"
                form="checkout-form"
                disabled={isPending}
                className="w-full py-5 bg-black text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition-all active:scale-[0.98] disabled:bg-gray-400"
              >
                {isPending
                  ? "Processing..."
                  : paymentMethod === "cod"
                    ? "Place Order"
                    : `Pay with ${paymentMethod}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// হেল্পার কম্পোনেন্ট: ইনপুট ফিল্ড
const InputField = ({ label, required, ...props }: any) => (
  <div className="space-y-1 flex-1">
    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
      {label} {required && "*"}
    </label>
    <input
      {...props}
      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#B3589D] text-sm transition-all"
    />
  </div>
);

// হেল্পার কম্পোনেন্ট: পেমেন্ট অপশন
const PaymentOption = ({ label, icon, active, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
      active ? "border-[#B3589D] bg-pink-50/30" : "border-gray-50 bg-gray-50/30"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`${active ? "text-[#B3589D]" : "text-gray-400"}`}>
        {icon}
      </div>
      <span
        className={`text-xs font-black uppercase ${active ? "text-gray-900" : "text-gray-500"}`}
      >
        {label}
      </span>
    </div>
    {active && <CheckCircle2 size={16} className="text-[#B3589D]" />}
  </div>
);
