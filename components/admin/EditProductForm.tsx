"use client";

import React, { useState, useRef, useTransition, useMemo } from "react";
import {
  ArrowLeft,
  Save,
  UploadCloud,
  Package,
  Tag,
  DollarSign,
  Ruler,
  RefreshCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProduct } from "@/app/actions/product";
import { toast } from "react-hot-toast";

// Types Define করা ভালো প্র্যাকটিস
interface ProductProps {
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    stock: number;
    description: string;
    images: any[];
    details?: {
      fabric?: string;
    };
  };
}

export default function EditProductForm({ product }: ProductProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // ১. ইমেজ ইউআরএল হ্যান্ডলিং (Safe access)
  const initialImageUrl = useMemo(() => {
    const img = product.images?.[0];
    return typeof img === "string" ? img : img?.url || null;
  }, [product.images]);

  const [preview, setPreview] = useState<string | null>(initialImageUrl);
  const [category, setCategory] = useState(product.category || "abaya");

  // ইমেজ প্রিভিউ লজিক
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        return toast.error("File is too large! Max 5MB.");
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ২. অপ্টিমাইজড ক্লায়েন্ট অ্যাকশন
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Default behavior বন্ধ করা

    const formData = new FormData(e.currentTarget);

    // ম্যানুয়ালি স্টেট ভ্যালু ইনজেক্ট করা (২ বার ক্লিক সমস্যা সমাধান করে)
    formData.set("category", category);

    startTransition(async () => {
      try {
        const result = await updateProduct(product._id, formData);

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Piece Updated Successfully! ✨");

          // রাউটার রিফ্রেশ এবং ব্যাক
          router.refresh();
          setTimeout(() => {
            router.push("/admin/products");
          }, 800);
        }
      } catch (err) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="group flex items-center gap-2 text-gray-500 hover:text-[#B3589D] transition-all font-bold"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Inventory
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-pink-100/30 overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-[#B3589D] p-10 text-white text-center relative overflow-hidden">
          <div className="absolute -top-6 -right-6 opacity-10 rotate-12">
            <RefreshCcw size={120} />
          </div>
          <h1 className="text-3xl font-black italic tracking-widest">
            Edit Product
          </h1>
          <p className="text-pink-100/80 text-sm font-medium mt-2">
            ID: <span className="font-mono text-xs">{product._id}</span>
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-8 md:p-12 space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Input Wrapper Component style */}
            <FormInput label="Product Title" icon={<Package size={20} />}>
              <input
                name="name"
                type="text"
                required
                defaultValue={product.name}
                className="form-input-styled"
              />
            </FormInput>

            <FormInput label="Category" icon={<Tag size={20} />}>
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
            </FormInput>

            <FormInput label="Price (৳)" icon={<DollarSign size={20} />}>
              <input
                name="price"
                type="number"
                required
                defaultValue={product.price}
                className="form-input-styled"
              />
            </FormInput>

            <FormInput
              label="Discount Price"
              icon={<DollarSign size={20} className="text-pink-400" />}
            >
              <input
                name="discountPrice"
                type="number"
                defaultValue={product.discountPrice}
                className="form-input-styled"
              />
            </FormInput>

            <FormInput label="Fabric Type" icon={<Ruler size={20} />}>
              <input
                name="fabric"
                type="text"
                defaultValue={product.details?.fabric}
                className="form-input-styled"
              />
            </FormInput>

            <FormInput label="Stock Quantity" icon={<Package size={20} />}>
              <input
                name="stock"
                type="number"
                required
                defaultValue={product.stock}
                className="form-input-styled"
              />
            </FormInput>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 flex justify-between px-1">
              Display Image
              <span className="text-[11px] text-[#B3589D] uppercase tracking-tighter">
                New upload replaces old
              </span>
            </label>
            <div className="relative group h-72 w-full rounded-[2.5rem] border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-all flex items-center justify-center overflow-hidden">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
              {preview ? (
                <div className="relative w-full h-full p-6 animate-in zoom-in-95 duration-300">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <RefreshCcw
                      className="text-white animate-spin-slow"
                      size={32}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <UploadCloud className="mx-auto text-gray-400" size={48} />
                  <p className="text-sm font-bold text-gray-500">
                    Click to Change Image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description Area */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 px-1">
              Product Story / Details
            </label>
            <textarea
              name="description"
              rows={5}
              defaultValue={product.description}
              className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:ring-4 focus:ring-[#B3589D]/10 focus:bg-white outline-none transition-all resize-none shadow-inner"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-6 rounded-[2.5rem] text-white font-black text-lg transition-all flex items-center justify-center gap-4 shadow-xl ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#B3589D] hover:bg-[#9c4a88] hover:shadow-pink-200/50 active:scale-[0.98]"
            }`}
          >
            {isPending ? (
              <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={24} />
                <span>CONFIRM CHANGES</span>
              </>
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        .form-input-styled {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 1.25rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input-styled:focus {
          background: white;
          border-color: #b3589d;
          box-shadow: 0 0 0 4px rgba(179, 88, 157, 0.1);
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
