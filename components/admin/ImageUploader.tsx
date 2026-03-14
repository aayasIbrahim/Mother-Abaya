"use client";

import React from "react";
import { UploadCloud, Image as ImageIcon, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  previews: string[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  maxImages?: number; // অপশনাল: ডিফল্ট ৮
}

export default function ImageUploader({
  previews,
  onImageChange,
  onRemove,
  maxImages = 8,
}: ImageUploaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-50 rounded-xl text-[#B3589D]">
            <ImageIcon size={20} />
          </div>
          <h3 className="font-bold text-gray-800">Product Gallery</h3>
        </div>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Max {maxImages} Images
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {/* Upload Button: ৮টার বেশি হলে হাইড হবে */}
        {previews.length < maxImages && (
          <div className="relative group h-36 rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#B3589D] hover:bg-pink-50/30 transition-all duration-300">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={onImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <UploadCloud className="text-gray-400 group-hover:text-[#B3589D] transition-transform" size={28} />
            <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Upload</span>
          </div>
        )}

        {/* Previews */}
        {previews.map((src, index) => (
          <div key={index} className="relative h-36 rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm group animate-in zoom-in-95">
            <img src={src} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-3 bg-white text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {/* যদি URL-এ http থাকে তারমানে এটা অলরেডি সার্ভারে আছে (Edit Mode) */}
            {src.startsWith("http") && (
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase text-gray-600 shadow-sm">
                Live
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}