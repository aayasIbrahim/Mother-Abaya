"use client";
import React from "react";
import { X, Ruler } from "lucide-react";

export default function SizeGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const chartData = [
    { label: "S", chest: "32-36", length: "40", hip: "40" },
    { label: "M", chest: "38-40", length: "42", hip: "44" },
    { label: "L", chest: "42-44", length: "44", hip: "48" },
    { label: "XL", chest: "46-48", length: "46", hip: "52" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#B3589D] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Ruler size={24} />
            <h2 className="text-xl font-black uppercase tracking-tight">Size Guide</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-500 font-medium">
            * All measurements are in <span className="font-bold text-gray-800">inches</span>. Please measure your body carefully before ordering.
          </p>

          <div className="overflow-hidden border border-gray-100 rounded-3xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-[10px] font-black uppercase text-gray-400">Size</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-400">Chest</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-400">Length</th>
                  <th className="p-4 text-[10px] font-black uppercase text-gray-400">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {chartData.map((row) => (
                  <tr key={row.label} className="hover:bg-pink-50/30 transition-colors">
                    <td className="p-4 font-black text-[#B3589D]">{row.label}</td>
                    <td className="p-4 text-sm font-bold text-gray-600">{row.chest}"</td>
                    <td className="p-4 text-sm font-bold text-gray-600">{row.length}"</td>
                    <td className="p-4 text-sm font-bold text-gray-600">{row.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-pink-50 p-4 rounded-2xl flex gap-4 items-start border border-pink-100">
            <div className="p-2 bg-white rounded-xl text-[#B3589D] shadow-sm">
                <Ruler size={18} />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold block text-gray-800 mb-1">How to measure?</span>
              For a comfortable fit, add <span className="font-bold">2-3 inches</span> to your body chest measurement when choosing a size.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
           <button 
             onClick={onClose}
             className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all"
           >
             Got it
           </button>
        </div>
      </div>
    </div>
  );
}