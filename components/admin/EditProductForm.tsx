"use client";

import React, { useState, useRef, useTransition, useMemo } from "react";
import ImageUploader from "./ImageUploader";
import {
  ArrowLeft,
  Save,
  UploadCloud,
  Package,
  Tag,
  DollarSign,
  Ruler,
  RefreshCcw,
  Trash2,
  ChevronDown,
  AlignLeft,
  Image,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProduct } from "@/actions/product.actions";
import { toast } from "react-hot-toast";
import SizeManager from "./SizeManager";
interface SizeObject {
  label: string;
  chest: string;
  length: string;
  stock: number;
}
interface ProductProps {
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    stock: number;
    description: string;
    images: string[];
    fabric?: string;
    sizes?: SizeObject[];
  };
}

export default function EditProductForm({ product }: ProductProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // --- ১. স্টেট আপডেট (Multiple Images) ---
  const [previews, setPreviews] = useState<string[]>(product.images || []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState(product.category || "abaya");
  const [sizes, setSizes] = useState<SizeObject[]>(
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : [{ label: "", chest: "", length: "", stock: 0 }],
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);

      // ফাইল সাইজ চেক
      const oversized = filesArray.find((f) => f.size > 5 * 1024 * 1024);
      if (oversized) return toast.error("Some files are too large! Max 5MB.");

      // নতুন ফাইলগুলো স্টেটে যোগ করা
      setSelectedFiles((prev) => [...prev, ...filesArray]);

      // প্রিভিউ তৈরি করা
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // ইমেজ রিমুভ হ্যান্ডলার
  const removeImage = (index: number) => {
    const isOldImage =
      index < (product.images?.length || 0) &&
      !selectedFiles[index - (product.images?.length || 0)];

    setPreviews((prev) => prev.filter((_, i) => i !== index));

    // যদি এটি নতুন সিলেক্ট করা ফাইল হয়, তবে ফাইল লিস্ট থেকেও রিমুভ করতে হবে
    const newFileIndex = index - (product.images?.length || 0);
    if (newFileIndex >= 0) {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // ইমেজ ডাটা প্রিপারেশন
    formData.delete("images");
    selectedFiles.forEach((file) => formData.append("images", file));

    // কোন পুরনো ছবিগুলো এখনো রাখা হয়েছে (Cloudinary URLs)
    const existingImages = previews.filter((p) => p.startsWith("http"));
    formData.set("existingImages", JSON.stringify(existingImages));

    // সাইজ অবজেক্ট পাঠানো
    formData.set("sizes", JSON.stringify(sizes));

    startTransition(async () => {
      try {
        const result = await updateProduct(product._id, formData);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Product Updated Successfully!");
          router.refresh();
          router.push("/admin/products");
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation & Actions */}
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

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
            Product ID: {product._id}
          </span>
        </div>
      </div>

      {/* Main Form Container */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Core Information */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-pink-100/20 border border-gray-100/50 overflow-hidden">
          <div className="bg-gradient-to-r from-[#B3589D] to-[#9c4a88] p-8 md:p-12 text-white relative">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Edit Product
              </h1>
              <p className="text-pink-100/70 text-sm mt-2 font-medium">
                Update your product details and inventory status
              </p>
            </div>
            <RefreshCcw className="absolute -right-8 -top-8 text-white/10 w-40 h-40 rotate-12" />
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput label="Product Title" icon={<Package size={18} />}>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={product.name}
                  className="form-input-styled"
                  placeholder="e.g. Premium Silk Abaya"
                />
              </FormInput>

              <FormInput label="Category" icon={<Tag size={18} />}>
                <div className="relative">
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
              </FormInput>

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Base Price (৳)"
                  icon={<DollarSign size={18} />}
                >
                  <input
                    name="price"
                    type="number"
                    required
                    defaultValue={product.price}
                    className="form-input-styled"
                  />
                </FormInput>
                <FormInput
                  label="Discount (৳)"
                  icon={<Zap size={18} className="text-orange-400" />}
                >
                  <input
                    name="discountPrice"
                    type="number"
                    defaultValue={product.discountPrice}
                    className="form-input-styled font-bold text-[#B3589D]"
                  />
                </FormInput>
              </div>

              <FormInput label="Fabric Type" icon={<Ruler size={18} />}>
                <input
                  name="fabric"
                  type="text"
                  defaultValue={product.fabric}
                  className="form-input-styled"
                  placeholder="e.g. Dubai Cherry Georgette"
                />
              </FormInput>
            </div>
          </div>
        </div>

        {/* Section 2: Inventory & Sizing */}
        <div className="bg-gray-50/50 rounded-[3rem] p-2 border border-gray-100">
          <SizeManager sizes={sizes} setSizes={setSizes} />
        </div>

        {/* Section 3: Media & Content */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-pink-100/20 border border-gray-100/50 p-8 md:p-12 space-y-10">
          {/* Gallery Section */}
          <ImageUploader
            previews={previews}
            onImageChange={handleImageChange}
            onRemove={removeImage}
          />

          {/* Description Section */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-2 flex items-center gap-2">
              <AlignLeft size={16} className="text-[#B3589D]" />
              Product Story & Details
            </label>
            <textarea
              name="description"
              rows={5}
              defaultValue={product.description}
              className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:ring-4 focus:ring-[#B3589D]/10 focus:bg-white focus:border-[#B3589D]/30 outline-none transition-all resize-none shadow-inner text-gray-600 leading-relaxed"
              placeholder="Tell the story of this product..."
            ></textarea>
          </div>

          {/* Final Action Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-6 rounded-[2rem] text-white font-black text-lg transition-all flex items-center justify-center gap-4 shadow-2xl ${
              isPending
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black hover:shadow-gray-300 active:scale-[0.98]"
            }`}
          >
            {isPending ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <div className="p-2 bg-white/10 rounded-xl">
                  <Save size={20} />
                </div>
                <span className="tracking-widest uppercase text-sm">
                  Update Product
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
          font-weight: 600;
          color: #374151;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-input-styled:focus {
          background: white;
          border-color: rgba(179, 88, 157, 0.3);
          box-shadow: 0 10px 15px -3px rgba(179, 88, 157, 0.1);
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

// সাব-কম্পোনেন্ট ফর ক্লিন কোড
function FormInput({
  label,
  icon,
  children,
}: {
  label: string;
  icon: any;
  children: any;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-2">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#B3589D] transition-colors">
          {icon}
        </div>
        {children}
      </div>
    </div>
  );
}
