"use client";
import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import SizeGuideModal from "./SizeGuideModel";
import SizeSelector from "./SizeSelector";
import { Plus, Minus, ShoppingBag, Ruler } from "lucide-react";
import toast from "react-hot-toast";
export default function ProductActionSection({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const availableSizes = product.sizes || [];
  const currentSizeData = availableSizes.find(
    (s: any) => s.label === selectedSize,
  );
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    // স্টক ভ্যালিডেশন (Industrial Standard)
    if (currentSizeData && quantity > currentSizeData.stock) {
      toast.error(
        `Only ${currentSizeData.stock} items left in stock for size ${selectedSize}`,
      );
      return;
    }
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      image:
        typeof product.images[0] === "string"
          ? product.images[0]
          : product.images[0]?.url,
      size: selectedSize,
      quantity: quantity,
    });
    toast.success(`${product.name} (Size: ${selectedSize}) added to cart!`);
  };

  return (
  <div className="space-y-8 max-w-md">
  {/* Size Selection Area */}
  <div className="space-y-5">
    {/* Header & Size Guide */}
    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
      <div className="flex flex-col gap-1">
        <span className="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400">
          Select Size
        </span>
        {/* যদি সাইজ সিলেক্ট থাকে তবে এখানে ইনভেন্টরি স্ট্যাটাস দেখাবে */}
        {selectedSize && (
          <span className={`text-[9px] font-bold uppercase tracking-tighter ${currentSizeData?.stock < 5 ? "text-red-500" : "text-green-600"}`}>
            {currentSizeData?.stock < 5 ? `⚠️ Only ${currentSizeData?.stock} left` : "✓ In Stock"}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setIsSizeModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] font-black text-[#B3589D] hover:bg-pink-50 transition-colors uppercase"
      >
        <Ruler size={12} /> Size Guide
      </button>
    </div>

    {/* Size Measurement Info (Selected State) */}
    {selectedSize && (
      <div className="flex items-center gap-3 p-3 bg-pink-50/50 rounded-2xl border border-pink-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <Ruler size={14} className="text-[#B3589D]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">Measurement</span>
          <span className="text-xs font-black text-[#B3589D] uppercase">
            Chest: {currentSizeData?.chest}" — Length: {currentSizeData?.length}"
          </span>
        </div>
      </div>
    )}

    {/* Size Selector Component */}
    <div className="pt-1">
      <SizeSelector 
        availableSizes={availableSizes} 
        selectedSize={selectedSize} 
        onSizeSelect={setSelectedSize} 
      />
    </div>
  </div>

  {/* Action Area: Quantity & Cart */}
  <div className="space-y-6 pt-2">
    <div className="flex items-center justify-between gap-4">
      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <span className="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400 ml-1">
          Quantity
        </span>
        <div className="flex items-center bg-gray-100/50 border border-gray-100 rounded-2xl p-1 w-fit">
          <button
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-[#B3589D] active:scale-90 transition-all"
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <span className="w-10 text-center font-black text-gray-800 text-lg">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-[#B3589D] active:scale-90 transition-all"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Quick Buy Info (Optional) */}
      <div className="hidden sm:block text-right">
        <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Delivery</p>
        <p className="text-xs font-black text-gray-700">2-3 Working Days</p>
      </div>
    </div>

    {/* Add to Cart Button */}
    <button
      onClick={handleAddToCart}
      className="w-full relative group overflow-hidden bg-[#B3589D] text-white py-6 rounded-[2rem] font-black text-lg shadow-2xl shadow-pink-200 hover:shadow-pink-300 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
      <ShoppingBag className="group-hover:rotate-12 transition-transform" size={24} />
      <span className="tracking-[0.1em] uppercase">Add to Cart</span>
    </button>
  </div>

  {/* Modal */}
  <SizeGuideModal
    isOpen={isSizeModalOpen}
    onClose={() => setIsSizeModalOpen(false)}
  />
</div>
  );
}
