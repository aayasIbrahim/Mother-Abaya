"use client";
import React, { useState } from "react";
import { ArrowLeft, Save, ImageIcon, Package, Tag, DollarSign } from "lucide-react";
import Link from "next/link";
// import { addProduct } from "@/libs/actions/product";
import { toast } from "react-hot-toast";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     setLoading(true);
//     // সার্ভার অ্যাকশন অটোমেটিক রিডাইরেক্ট করবে, তাই এখানে বাড়তি হ্যান্ডলিং কম
//   };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/products" className="flex items-center gap-2 text-gray-500 hover:text-[#B3589D] transition-colors font-bold">
          <ArrowLeft size={20} />
          Back to List
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-pink-100/20 overflow-hidden">
        <div className="bg-[#B3589D] p-8 text-white">
          <h1 className="text-2xl font-black">Add New Collection</h1>
          <p className="text-pink-100 text-sm font-medium">Create a new luxury item for Mother Abaya</p>
        </div>

        <form  className="p-8 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Product Title</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="name" 
                  type="text" 
                  required
                  placeholder="e.g. Dubai Luxury Abaya" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select 
                  name="category"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none appearance-none transition-all"
                >
                  <option value="abaya">Abaya</option>
                  <option value="hijab">Hijab</option>
                  <option value="modest-wear">Modest Wear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Price (BDT)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="price" 
                  type="number" 
                  required
                  placeholder="0.00" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none transition-all"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Stock Quantity</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  name="stock" 
                  type="number" 
                  required
                  placeholder="10" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Image URL (আপাতত ইউআরএল হিসেবে) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                name="image" 
                type="text" 
                required
                placeholder="https://example.com/image.jpg" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
            <textarea 
              name="description"
              rows={4}
              placeholder="Describe the product details, fabric, and size..."
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-2 focus:ring-[#B3589D]/20 focus:border-[#B3589D] outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#B3589D] text-white font-black py-5 rounded-[2rem] shadow-xl shadow-pink-200 hover:bg-[#a04a8b] transform active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Adding Product..." : (
              <>
                <Save size={20} />
                Publish Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}