"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center gap-6">
      <span className="font-bold uppercase text-[10px] tracking-[0.2em] text-gray-400">
        Quantity:
      </span>
      
      <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1 shadow-sm">
        <button
          onClick={decrement}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-600 hover:text-[#B3589D] hover:shadow-md transition-all active:scale-90"
        >
          <Minus size={16} strokeWidth={3} />
        </button>

        <span className="w-12 text-center font-black text-gray-800 text-lg">
          {quantity}
        </span>

        <button
          onClick={increment}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-600 hover:text-[#B3589D] hover:shadow-md transition-all active:scale-90"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}