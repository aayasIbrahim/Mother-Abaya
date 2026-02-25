"use client";
import React, { useState, useRef, useTransition } from "react";
import {
  ArrowLeft,
  Save,
  X,
  UploadCloud,
  Package,
  Tag,
  DollarSign,
  Ruler,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProduct } from "@/app/(admin)/admin/products/add/actions";

import { toast } from "react-hot-toast";

export default function AddProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState("abaya");

  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await addProduct(formData);

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Product Published Successfully!");

          setTimeout(() => {
            router.push("/admin/products");
            router.refresh();
          }, 1500);
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-gray-500 hover:text-[#B3589D] transition-colors font-bold"
        >
          <ArrowLeft size={20} /> Back to List
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/20 overflow-hidden border border-gray-100">
        <div className="bg-[#B3589D] p-8 text-white text-center">
          <h1 className="text-2xl font-black italic">MOTHER ABAYA</h1>
          <p className="text-pink-100 text-sm font-medium">
            Add a luxury piece to your collection
          </p>
        </div>

        <form
          action={clientAction}
          encType="multipart/form-data"
          className="p-8 md:p-10 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Product Title
              </label>
              <div className="relative">
                <Package
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="BAGICHA"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#B3589D]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Category
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none appearance-none"
                >
                  <option value="abaya">Abaya</option>
                  <option value="3-piece">3-Piece Suit</option>
                  <option value="hijab">Hijab</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Original Price
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  name="price"
                  type="number"
                  required
                  placeholder="2580"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Discount Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Discount Price (Optional)
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
                  size={20}
                />
                <input
                  name="discountPrice"
                  type="number"
                  placeholder="2250"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Fabric */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Fabric Material
              </label>
              <div className="relative">
                <Ruler
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  name="fabric"
                  type="text"
                  placeholder="Diamond Georgette"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Stock
              </label>
              <div className="relative">
                <Package
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  name="stock"
                  type="number"
                  required
                  placeholder="10"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none"
                />
              </div>
            </div>
          </div>
          {/* Image URL */}
          {/* ✅ UPDATED IMAGE SECTION */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Product Image
            </label>

            <div className="relative h-48 w-full rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden group">
              <input
                ref={fileInputRef}
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {!preview ? (
                <div className="flex flex-col items-center pointer-events-none">
                  <UploadCloud
                    className="text-gray-400 group-hover:text-[#B3589D] mb-2"
                    size={32}
                  />
                  <span className="text-xs font-bold text-gray-500">
                    Click to upload product image
                  </span>
                </div>
              ) : (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);

                      // Reset actual file input value
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition-transform active:scale-90 z-20"
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>

            <p className="text-[10px] text-gray-400 ml-2 italic">
              Recommended: Square image (1:1), Max 5MB
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Product details..."
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none transition-all resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#B3589D] text-white font-black py-5 rounded-[2rem] shadow-xl hover:bg-[#a04a8b] transition-all flex items-center justify-center gap-3"
          >
            {isPending ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} /> Publish Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
