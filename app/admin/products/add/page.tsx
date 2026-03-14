"use client";
import React, { useState, useRef, useTransition } from "react";
import {
  ArrowLeft,
  Save,
  Package,
  Tag,
  DollarSign,
  Ruler,
  Sparkles,
  AlignLeft,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { addProduct } from "@/actions/product.actions";
import SizeManager from "@/components/admin/SizeManager";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AddProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("abaya");
  const [sizes, setSizes] = useState([
    { label: "", chest: "", length: "", stock: 0 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);

      // ১. আসল ফাইলগুলো জমা রাখা (যাতে পরে সার্ভারে পাঠানো যায়)
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      // ২. প্রিভিউ তৈরি করা
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };
  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        // ১. ডিফল্ট images রিমুভ করে দেওয়া (যাতে input-এর ১টি ছবি না যায়)
        formData.append("sizes", JSON.stringify(sizes));
        formData.delete("images");

        // ২. selectedFiles স্টেট থেকে লুপ চালিয়ে সব ছবি যোগ করা
        if (selectedFiles.length > 0) {
          selectedFiles.forEach((file) => {
            formData.append("images", file);
          });
        } else {
          toast.error("Please select at least one image!");
          return;
        }

        // ৩. সার্ভার অ্যাকশন কল করা
        const result = await addProduct(formData);

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message || "Product Published Successfully!");

          // সাকসেস হলে স্টেট ক্লিয়ার করা (ঐচ্ছিক কিন্তু ভালো প্র্যাকটিস)
          setPreviews([]);
          setSelectedFiles([]);

          router.push("/admin/products");
          router.refresh();
        }
      } catch (err) {
        toast.error("Something went wrong!");
        console.error(err);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation */}
      <div className="flex items-center justify-between px-2">
        <Link
          href="/admin/products"
          className="group flex items-center gap-2.5 text-gray-400 hover:text-[#B3589D] transition-all font-bold text-sm"
        >
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-pink-50 transition-colors">
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </div>
          Back to Inventory
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full">
          <Sparkles size={14} className="text-[#B3589D]" />
          <span className="text-[10px] font-black text-[#B3589D] uppercase tracking-widest">
            New Arrival Mode
          </span>
        </div>
      </div>

      <form
        action={onSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {/* Section 1: Core Info */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-pink-100/20 border border-gray-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-[#B3589D] to-[#8a3d76] p-10 md:p-14 text-white relative">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic">
                CREATE PRODUCT
              </h1>
              <p className="text-pink-100/80 text-sm mt-3 font-medium max-w-md uppercase tracking-wider">
                Launch your next masterpiece to the luxury collection
              </p>
            </div>
            <Package className="absolute -right-10 -top-10 text-white/10 w-48 h-48 rotate-12" />
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Title */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Product Title
                </label>
                <div className="relative group">
                  <Package
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B3589D] transition-colors"
                    size={20}
                  />
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. LUXURY BAGICHA"
                    className="form-input-styled"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Category
                </label>
                <div className="relative group">
                  <Tag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B3589D] transition-colors"
                    size={20}
                  />
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    className="form-input-styled appearance-none cursor-pointer"
                  >
                    <option value="abaya">Abaya</option>
                    <option value="3-piece">3-Piece Suit</option>
                    <option value="hijab">Hijab</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Price (৳)
                  </label>
                  <div className="relative group">
                    <DollarSign
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B3589D]"
                      size={20}
                    />
                    <input
                      name="price"
                      type="number"
                      required
                      placeholder="2580"
                      className="form-input-styled"
                    />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                    Discount (৳)
                  </label>
                  <div className="relative group">
                    <Zap
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                      size={20}
                    />
                    <input
                      name="discountPrice"
                      type="number"
                      placeholder="2250"
                      className="form-input-styled font-bold text-[#B3589D]"
                    />
                  </div>
                </div>
              </div>

              {/* Fabric */}
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Fabric Material
                </label>
                <div className="relative group">
                  <Ruler
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B3589D]"
                    size={20}
                  />
                  <input
                    name="fabric"
                    type="text"
                    placeholder="Diamond Georgette"
                    className="form-input-styled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Variations */}
        <div className="bg-gray-50/50 rounded-[3.5rem] p-2 border border-gray-100 shadow-inner">
          <SizeManager sizes={sizes} setSizes={setSizes} />
        </div>

        {/* Section 3: Media & Content */}
        <div className="bg-white rounded-[3.5rem] shadow-xl shadow-pink-100/20 border border-gray-100/50 p-8 md:p-14 space-y-12">
          {/* Gallery */}
          <ImageUploader
            previews={previews}
            onImageChange={handleImageChange}
            onRemove={removeImage}
          />

          {/* Description Area */}
          <div className="space-y-4">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-3 flex items-center gap-2">
              <AlignLeft size={14} className="text-[#B3589D]" />
              Product Story / Detailed Description
            </label>
            <textarea
              name="description"
              rows={6}
              placeholder="Describe the elegance of this product..."
              className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[3rem] focus:ring-4 focus:ring-[#B3589D]/10 focus:bg-white focus:border-[#B3589D]/30 outline-none transition-all resize-none shadow-inner text-gray-600 leading-relaxed font-medium"
            ></textarea>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-7 rounded-[2.5rem] text-white font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl ${
              isPending
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black hover:shadow-gray-400 active:scale-[0.98]"
            }`}
          >
            {isPending ? (
              <div className="w-7 h-7 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <div className="p-2.5 bg-white/10 rounded-2xl">
                  <Save size={22} />
                </div>
                <span className="tracking-[0.15em] uppercase">
                  Publish Product
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-input-styled {
          width: 100%;
          padding: 1.125rem 1.125rem 1.125rem 3.5rem;
          background: #f9fafb;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          outline: none;
          font-weight: 700;
          font-size: 0.875rem;
          color: #1f2937;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-input-styled:focus {
          background: white;
          border-color: rgba(179, 88, 157, 0.4);
          box-shadow: 0 15px 25px -5px rgba(179, 88, 157, 0.15);
        }
        .form-input-styled::placeholder {
          color: #9ca3af;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
