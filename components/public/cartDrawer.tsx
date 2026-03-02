"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart, // নিশ্চিত করুন আপনার স্টোরে এই ফাংশনটি আছে
  } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay with subtle blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[4px] transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-[400px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-3">
            <h2 className="text-[14px] font-black uppercase tracking-[0.15em] text-gray-900">
              Your Bag
            </h2>
            <span className="bg-[#B3589D] text-white text-[10px] px-2 py-0.5 rounded-full font-black">
              {getTotalItems()} ITEMS
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-50 rounded-full transition-all active:scale-90"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-gray-50/20">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <div className="space-y-2">
                <p className="text-[13px] font-bold uppercase tracking-widest text-gray-500">
                  Your cart is empty
                </p>
                <button 
                   onClick={closeCart}
                   className="text-[11px] font-black text-[#B3589D] underline underline-offset-4 uppercase"
                >
                    Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <button 
                  onClick={() => { if(confirm("Clear all items?")) clearCart() }}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase tracking-tighter"
                >
                  <Trash2 size={12} />
                  Clear Cart
                </button>
              </div>

              {cart.map((item) => (
                <div key={item._id + item.size} className="flex gap-4 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[13px] font-black text-gray-900 uppercase leading-tight tracking-tight">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-[10px] font-bold text-[#B3589D] uppercase tracking-widest">
                        Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="text-[12px] font-black w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-[14px] font-black text-gray-900">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Total Payable:
                </span>
                <span className="text-2xl font-black text-gray-900 leading-none">
                  ৳{getTotalPrice().toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] font-bold text-green-500 uppercase pb-1">
                Tax Included
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <Link
                href="/checkout"
                className="w-full py-5 bg-[#B3589D] hover:bg-[#9c4a88] text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-pink-100 transition-all flex items-center justify-center gap-2 active:scale-95"
                onClick={closeCart}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                className="w-full py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all"
                onClick={closeCart}
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}