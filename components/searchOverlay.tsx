"use client";
import React, { useState, useEffect, useTransition } from "react";
import { searchProducts } from "@/libs/actions/product";
import { Search, X, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  // স্ক্রল লক করার জন্য (যখন সার্চ ওপেন থাকবে)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length > 0) {
        startTransition(async () => {
          const data = await searchProducts(query);
          setResults(data);
        });
      } else {
        setResults([]);
      }
    }, 300); // Debounce যোগ করা হয়েছে পারফরম্যান্সের জন্য

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col md:items-center md:justify-center md:p-4">
      {/* Background Overlay - ডেস্কটপে দেখাবে */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm hidden md:block"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full h-full md:h-auto md:max-w-xl bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 md:zoom-in duration-300">
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          {/* মোবাইলে ব্যাক বাটন */}
          <button onClick={onClose} className="md:hidden p-1">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-50 md:bg-transparent px-4 py-2.5 md:py-1 md:px-0 text-base md:text-lg font-bold outline-none rounded-full md:rounded-none"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>

          <div className="flex items-center">
            {isPending ? (
              <Loader2 className="animate-spin text-[#B3589D]" size={20} />
            ) : query.length > 0 ? (
              <X
                size={20}
                className="text-gray-400 cursor-pointer"
                onClick={() => setQuery("")}
              />
            ) : (
              <Search size={20} className="text-gray-300 hidden md:block" />
            )}
          </div>

          {/* ডেস্কটপে ক্লোজ বাটন */}
          <button
            onClick={onClose}
            className="hidden md:flex p-1.5 hover:bg-gray-100 rounded-full transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info Bar */}
        <div className="px-5 py-2 bg-gray-50/50 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#B3589D]">
            {query.length > 0
              ? `Results (${results.length})`
              : "Start typing to search"}
          </span>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-10 md:max-h-[400px]">
          {results.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {results.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 active:bg-pink-50 transition-colors"
                >
                  <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                      src={
                        typeof product.images[0] === "string"
                          ? product.images[0]
                          : product.images[0].url
                      }
                      className="w-full h-full object-cover"
                      alt={product.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold uppercase text-gray-800 truncate leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-[14px] font-black text-[#B3589D] mt-1">
                      ৳{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 1 && !isPending ? (
            <div className="p-20 text-center">
              <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                <Search size={30} className="text-gray-300" />
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                No results found
              </p>
            </div>
          ) : (
            /* খালি অবস্থায় সাজেস্ট ক্যাটাগরি দেখাতে পারেন */
            <div className="p-6">
              <h5 className="text-[11px] font-bold text-gray-400 uppercase mb-4 tracking-tighter">
                Popular Suggestions
              </h5>
              <div className="flex flex-wrap gap-2">
                {["Abaya", "Hijab", "New Arrival", "Black Abaya"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-600 hover:bg-[#B3589D] hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
