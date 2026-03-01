"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-[380px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-gray-800">
              Shopping Cart
            </h2>
            <span className="bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-40">
              <p className="text-xs uppercase font-bold tracking-tighter">
                Your cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id + item.size} className="flex gap-4 mb-6 group">
                {/* Product Image */}
                <div className="w-20 h-24 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[12px] font-bold text-gray-800 uppercase tracking-tight">
                      {item.name} - {item.size}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector inside Drawer */}
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="px-2 py-1 text-gray-400 hover:text-black"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[11px] font-bold w-6 text-center border-x border-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="px-2 py-1 text-gray-400 hover:text-black"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-[12px] font-bold text-gray-900">
                      {item.price * item.quantity}.00৳
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 space-y-4 bg-gray-50/30">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Subtotal:
              </span>
              <span className="text-[14px] font-black text-gray-900">
                {getTotalPrice()}.00৳
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/cart"
                className="block w-full py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800 border border-gray-200 bg-white hover:bg-gray-50 transition-all"
                onClick={closeCart}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                className="block w-full py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-black hover:bg-gray-800 transition-all"
                onClick={closeCart}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
