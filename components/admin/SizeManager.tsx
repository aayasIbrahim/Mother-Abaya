"use client";

import React from "react";
import { Plus, Trash2, Info, ChevronDown, Ruler, Layers, Minus, Box } from "lucide-react";

interface SizeObject {
  label: string;
  chest: string;
  length: string;
  stock: number;
}

interface SizeManagerProps {
  sizes: SizeObject[];
  setSizes: (sizes: SizeObject[]) => void;
}

const sizePresets = [
  { label: "S", chest: "32-36", length: "40" },
  { label: "M", chest: "38-40", length: "42" },
  { label: "L", chest: "42-44", length: "44" },
  { label: "XL", chest: "46-48", length: "46" },
];

export default function SizeManager({ sizes, setSizes }: SizeManagerProps) {
  
  const addSizeRow = () => {
    setSizes([...sizes, { label: "", chest: "", length: "", stock: 0 }]);
  };

  const removeSizeRow = (index: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleSizeSelection = (index: number, selectedLabel: string) => {
    const updated = [...sizes];
    const preset = sizePresets.find((p) => p.label === selectedLabel);
    updated[index] = { 
      ...updated[index], 
      label: selectedLabel,
      chest: preset ? preset.chest : updated[index].chest, 
      length: preset ? preset.length : updated[index].length,
    };
    setSizes(updated);
  };

  const handleInputChange = (index: number, field: keyof SizeObject, value: string | number) => {
    const updated = [...sizes];
    updated[index] = { ...updated[index], [field]: value };
    setSizes(updated);
  };

  // স্টক বাড়ানো বা কমানোর ফাংশন
  const toggleStock = (index: number, delta: number) => {
    const updated = [...sizes];
    const currentStock = updated[index].stock || 0;
    updated[index].stock = Math.max(0, currentStock + delta);
    setSizes(updated);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex p-3 bg-pink-50 rounded-2xl text-[#B3589D]">
            <Layers size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Variations</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Stock per size</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addSizeRow}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B3589D] text-white rounded-2xl text-xs font-black hover:bg-[#9c4a88] transition-all shadow-lg shadow-pink-100 active:scale-95"
        >
          <Plus size={18} /> ADD NEW SIZE
        </button>
      </div>

      {/* Variation Rows */}
      <div className="space-y-4">
        {sizes.map((item, index) => (
          <div 
            key={index} 
            className="group bg-white p-5 md:p-6 rounded-[2.8rem] border border-gray-100 hover:border-pink-200 transition-all duration-300 relative shadow-sm hover:shadow-md"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-4 md:hidden">
               <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase">
                 Variation #{index + 1}
               </span>
               {sizes.length > 1 && (
                 <button 
                  onClick={() => removeSizeRow(index)}
                  className="p-2 text-red-500 bg-red-50 rounded-lg"
                 >
                   <Trash2 size={16} />
                 </button>
               )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 items-end">
              {/* Size Selector */}
              <div className="col-span-2 md:col-span-3 space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Ruler size={12} className="text-[#B3589D]" />
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Size Label</label>
                </div>
                <div className="relative">
                  <select
                    value={item.label}
                    onChange={(e) => handleSizeSelection(index, e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-[#B3589D] rounded-2xl outline-none text-sm font-bold text-gray-700 appearance-none cursor-pointer transition-all"
                  >
                    <option value="">Select</option>
                    {sizePresets.map((p) => (
                      <option key={p.label} value={p.label}>{p.label}</option>
                    ))}
                    <option value="Custom">Custom</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Chest Input */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-tighter">Chest</label>
                <input
                  type="text"
                  placeholder="32-36"
                  value={item.chest}
                  onChange={(e) => handleInputChange(index, "chest", e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-[#B3589D] rounded-2xl outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Length Input */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-tighter">Length</label>
                <input
                  type="text"
                  placeholder="42"
                  value={item.length}
                  onChange={(e) => handleInputChange(index, "length", e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-[#B3589D] rounded-2xl outline-none text-sm font-semibold transition-all"
                />
              </div>

              {/* Updated Stock Counter (Desktop Optimized) */}
              <div className="col-span-2 md:col-span-4 space-y-2">
                <div className="flex items-center gap-2 ml-1">
                   <Box size={12} className="text-[#B3589D]" />
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Inventory Stock</label>
                </div>
                <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-[#B3589D]/30 focus-within:bg-white focus-within:shadow-sm rounded-2xl p-1 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => toggleStock(index, -1)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all active:scale-90"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) => handleInputChange(index, "stock", parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent text-center text-sm font-black text-black outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  
                  <button
                    type="button"
                    onClick={() => toggleStock(index, 1)}
                    className="p-2.5 text-gray-400 hover:text-[#B3589D] hover:bg-white rounded-xl transition-all active:scale-90"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Desktop Delete Button */}
              <div className="hidden md:flex md:col-span-1 justify-center pb-1">
                <button
                  type="button"
                  onClick={() => removeSizeRow(index)}
                  disabled={sizes.length === 1}
                  className="p-3 text-gray-300 hover:text-white hover:bg-red-500 rounded-2xl transition-all duration-300 disabled:opacity-0"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="flex items-center justify-between p-6 bg-gray-900 rounded-[2rem] text-white">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/10 rounded-xl">
                <Info size={18} className="text-pink-300" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Available Stock</span>
          </div>
          <span className="text-xl font-black text-pink-400">
             {sizes.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0)}
          </span>
      </div>
    </div>
  );
}