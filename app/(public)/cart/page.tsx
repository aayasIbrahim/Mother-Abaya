"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, X } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotalPrice();

  const courierCharge = subtotal > 0 ? 113 : 0;

  const total = subtotal + courierCharge;

  return (
    <div className="min-h-screen bg-[#FDF7FB]">
      {/* Header Section */}
      <PageHero title="Cart" />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:flex gap-8">
        {/* Left Side: Product Table */}
        <div className="lg:w-2/3 bg-white p-6 rounded-sm shadow-sm h-fit">
          <div className="hidden md:grid grid-cols-12 border-b pb-4 text-[13px] font-bold uppercase tracking-wider text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center uppercase tracking-widest text-gray-400">
              Your cart is currently empty.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id + item.size}
                className="grid grid-cols-1 md:grid-cols-12 items-center py-6 border-b border-gray-50 gap-4"
              >
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-gray-300 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-sm"
                  />
                  <div>
                    <h3 className="text-sm font-bold uppercase">
                      {item.name} — {item.size}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-sm font-medium">
                  {item.price.toLocaleString()}.00৳
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white shadow-sm">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          item.size,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                      className="p-2 hover:text-[#B3589D]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="p-2 hover:text-[#B3589D]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-right text-sm font-bold">
                  {(item.price * item.quantity).toLocaleString()}.00৳
                </div>
              </div>
            ))
          )}

          {/* Coupon Section */}
          <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="bg-[#f2f2f2] px-4 py-2 text-sm outline-none border border-transparent focus:border-gray-200 rounded-sm"
              />
              <button className="bg-black text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-gray-800">
                Apply coupon
              </button>
            </div>
            <button className="bg-[#8c8c8c] text-white px-6 py-2 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-gray-700">
              Update cart
            </button>
          </div>
        </div>

        {/* Right Side: Cart Totals */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white p-8 border border-gray-100 rounded-sm shadow-sm">
            <h2 className="text-xl font-bold mb-6">Cart totals</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between pb-4 border-b">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">
                  {subtotal.toLocaleString()}.00৳
                </span>
              </div>

              <div className="flex justify-between items-start pb-4 border-b">
                <span className="font-medium">Shipping</span>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Calculate shipping</p>
                </div>
              </div>

              <div className="flex justify-between pb-4 border-b">
                <span className="font-medium">COD 1% Courier</span>
                <span className="font-bold">
                  {courierCharge.toLocaleString()}.00৳
                </span>
              </div>

              <div className="flex justify-between pt-4 text-lg">
                <span className="font-bold">Total</span>
                <span className="font-black text-[#B3589D]">
                  {total.toLocaleString()}.00৳
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full mt-8 bg-black text-white text-center py-4 rounded-sm text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
