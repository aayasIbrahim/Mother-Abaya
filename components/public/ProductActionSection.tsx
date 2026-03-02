"use client";
import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductActionSection({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const addToCart = useCartStore((state) => state.addToCart);

  const sizeData = [
    { label: "S", desc: "32-36" },
    { label: "M", desc: "38-40" },
    { label: "L", desc: "42-44" },
    { label: "XL", desc: "46-48" },
  ];

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image:
        typeof product.images[0] === "string"
          ? product.images[0]
          : product.images[0]?.url,
      size: selectedSize,
      quantity: quantity,
    });
    toast.success("Successfully added to cart!");
  };

  return (
    <div className="space-y-8 px-4 sm:px-6">
      {/* Size Selector */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="font-bold uppercase text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400">
            Select Size:
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#B3589D]">
            Size: {selectedSize} (
            {sizeData.find((s) => s.label === selectedSize)?.desc} inch)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {sizeData.map((s) => (
            <button
              key={s.label}
              onClick={() => setSelectedSize(s.label)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl font-black text-sm sm:text-base transition-all border-2 ${
                selectedSize === s.label
                  ? "border-[#B3589D] bg-[#B3589D] text-white shadow-lg shadow-pink-100 scale-110"
                  : "border-gray-100 bg-white text-gray-600 hover:border-pink-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
          <span className="font-bold uppercase text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 mb-2 sm:mb-0">
            Quantity:
          </span>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 hover:text-[#B3589D] transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-black text-gray-800 text-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 hover:text-[#B3589D] transition-all"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#B3589D] text-white py-5 sm:py-6 rounded-[1.5rem] font-black text-lg sm:text-xl shadow-2xl shadow-pink-200 hover:bg-[#9c4a88] transition-all active:scale-95 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 group"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingBag className="group-hover:animate-bounce" size={20} />
            ADD TO CART
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-0">
            <span className="text-sm opacity-50 font-normal">|</span>
            <span className="text-sm font-bold tracking-widest uppercase text-pink-100">
              Quick Buy
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
