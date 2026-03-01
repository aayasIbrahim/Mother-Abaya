"use client";
import React, { useState, useEffect, useTransition } from "react";
import { searchProducts } from "@/libs/actions/product";
import { Search, X, Loader2 } from "lucide-react";
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

  useEffect(() => {
    if (query.length > 0) {
      startTransition(async () => {
        const data = await searchProducts(query);
        setResults(data);
      });
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B3589D]">
            Search Products ({results.length})
          </span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white rounded-full transition-all shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Input Field */}
        <div className="p-5 relative">
          <input
            autoFocus
            type="text"
            placeholder="Search for abayas, hijabs..."
            className="w-full text-lg font-bold outline-none bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-6 top-6">
            {isPending ? (
              <Loader2 className="animate-spin text-[#B3589D]" size={22} />
            ) : (
              <Search size={22} className="text-gray-300" />
            )}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-[350px] overflow-y-auto border-t">
            {results.map((product: any) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-4 hover:bg-pink-50/30 transition-all border-b border-gray-50"
              >
                <div className="w-12 h-14 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={
                      typeof product.images[0] === "string"
                        ? product.images[0]
                        : product.images[0].url
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold uppercase text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-xs font-black text-[#B3589D]">
                    ৳{product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
