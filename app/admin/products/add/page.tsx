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
import { toast } from "react-hot-toast";
import { addProduct } from "@/actions/product.actions";

export default function AddProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState("abaya");
  const [sizes, setSizes] = useState([
    { label: "", chest: "", length: "", stock: 0 },
  ]);

  const addSizeRow = () => {
    setSizes([...sizes, { label: "", chest: "", length: "", stock: 0 }]);
  };

  const removeSizeRow = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setSizes(updatedSizes);
  };

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
          action={onSubmit}
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
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-gray-700">
                  Size & Stock Management
                </label>
                <button
                  type="button"
                  onClick={addSizeRow}
                  className="text-xs font-bold text-[#B3589D] hover:underline flex items-center gap-1"
                >
                  + Add Another Size
                </button>
              </div>

              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 relative group"
                  >
                    <input
                      placeholder="Size (e.g. 52)"
                      value={size.label}
                      onChange={(e) =>
                        handleSizeChange(index, "label", e.target.value)
                      }
                      className="p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none"
                      required
                    />
                    <input
                      placeholder="Chest (inch)"
                      value={size.chest}
                      onChange={(e) =>
                        handleSizeChange(index, "chest", e.target.value)
                      }
                      className="p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none"
                    />
                    <input
                      placeholder="Length (inch)"
                      value={size.length}
                      onChange={(e) =>
                        handleSizeChange(index, "length", e.target.value)
                      }
                      className="p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={size.stock}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          "stock",
                          parseInt(e.target.value),
                        )
                      }
                      className="p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none"
                      required
                    />

                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(index)}
                        className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
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
          </div>
          {/* Image URL */}

          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Product Images (Multiple)
            </label>

            {/* আপলোড এরিয়া */}
            <div className="relative h-40 w-full rounded-[2rem] border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden group hover:border-[#B3589D] transition-colors">
              <input
                ref={fileInputRef}
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center pointer-events-none">
                <UploadCloud
                  className="text-gray-400 group-hover:text-[#B3589D] mb-2"
                  size={32}
                />
                <span className="text-xs font-bold text-gray-500">
                  Click to add multiple images
                </span>
              </div>
            </div>

            {/* প্রিভিউ গ্রিড */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl border border-gray-100 overflow-hidden shadow-sm group"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[10px] text-gray-400 ml-2 italic">
              Tip: You can select multiple images at once. Square (1:1) works
              best.
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
