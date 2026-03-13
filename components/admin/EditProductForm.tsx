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
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProduct } from "@/actions/product.actions";
import { toast } from "react-hot-toast";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    stock: number;
    description: string;
    images: string[]; // ধরে নিচ্ছি এটি স্ট্রিং অ্যারে

    fabric?: string;
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

  // ইমেজ সিলেক্ট হ্যান্ডলার
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
    formData.set("category", category);

    // --- ২. ম্যানুয়ালি সব ছবি অ্যাড করা ---
    formData.delete("images"); // আগের ডাটা ক্লিয়ার করা
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // যদি আপনি চান সার্ভার জানুক কোন পুরনো ছবিগুলো এখনো আছে
    formData.set(
      "existingImages",
      JSON.stringify(previews.filter((p) => p.startsWith("http"))),
    );

    startTransition(async () => {
      try {
        const result = await updateProduct(product._id, formData);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Product Updated Successfully! ✨");
          router.refresh();
          router.push("/admin/products");
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
                defaultValue={product.fabric}
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
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 flex justify-between px-1">
              Product Gallery
              <span className="text-[11px] text-[#B3589D] uppercase tracking-tighter">
                Add or remove images
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* আপলোড বাটন (বক্স আকারে) */}
              <div className="relative group h-32 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#B3589D] transition-all">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <UploadCloud
                  className="text-gray-400 group-hover:text-[#B3589D]"
                  size={24}
                />
                <span className="text-[10px] font-bold text-gray-500 mt-1">
                  Add More
                </span>
              </div>

              {/* ইমেজ প্রিভিউ কার্ডস */}
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="relative h-32 rounded-3xl border border-gray-100 overflow-hidden shadow-sm group animate-in zoom-in-95 duration-300"
                >
                  <img
                    src={src}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg active:scale-90"
                  >
                    <X size={14} />
                  </button>
                  {/* যদি এটি পুরনো ইমেজ হয় (Cloudinary URL) */}
                  {src.startsWith("http") && (
                    <div className="absolute bottom-0 inset-x-0 bg-[#B3589D]/80 text-[8px] text-white text-center py-1 font-bold uppercase">
                      Stored
                    </div>
                  )}
                </div>
              ))}
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
