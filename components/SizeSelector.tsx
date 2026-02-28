"use client";

import { useState } from "react";
interface SizeSelectorProps {
  dbSizes?: string[];
}

export default function SizeSelector({ dbSizes }: SizeSelectorProps) {
  const sizeData = [
    { label: "S", measurement: "32-36" },
    { label: "M", measurement: "38-40" },
    { label: "L", measurement: "42-44" },
    { label: "XL", measurement: "46-48" },
  ];

  const [selectedSize, setSelectedSize] = useState(sizeData[1]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-black uppercase text-[10px] tracking-[0.2em] text-gray-400">
          Select Your Size:
        </span>
        <button className="text-[10px] font-bold text-[#B3589D] underline uppercase tracking-tighter">
          Size Guide
        </button>
      </div>

      {/* Size Buttons */}
      <div className="flex flex-wrap gap-3">
        {sizeData.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setSelectedSize(item)}
            className={`
              w-14 h-12 rounded-2xl font-black text-sm transition-all duration-300 border-2
              ${
                selectedSize.label === item.label
                  ? "border-[#B3589D] bg-[#B3589D] text-white shadow-lg shadow-pink-200 scale-105"
                  : "border-gray-100 bg-white text-gray-600 hover:border-pink-200"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Dynamic Size Chart Info */}
      <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#B3589D] animate-pulse"></div>
          <p className="text-xs font-bold text-gray-700">
            Fitting:{" "}
            <span className="text-[#B3589D] font-black">
              {selectedSize.label}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            Body Range:{" "}
            <span className="text-[#B3589D] font-black">
              {selectedSize.measurement} inch
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
