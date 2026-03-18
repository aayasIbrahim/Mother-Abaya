"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getRecentlyViewedProducts } from "@/actions/product.actions";

export default function RecentlyViewed() {
  const [viewedProducts, setViewedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const ids = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      
      if (ids.length <= 1) {
        setLoading(false);
        return;
      }

      // সরাসরি Server Action কল করা হচ্ছে
      const data = await getRecentlyViewedProducts(ids);
      setViewedProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading || viewedProducts.length === 0) return null;

  return (
    <div className="mt-24 mb-20 border-t border-gray-100 pt-16">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 space-y-2 px-4 text-center">
        <span className="text-[#B3589D] text-[10px] font-black uppercase tracking-[0.3em]">
          Based on your history
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter">
          Recently Viewed
        </h2>
        <div className="w-12 h-1 bg-[#B3589D] rounded-full" />
      </div>

      {/* Native Scroll Container */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-5 pb-8 px-4 md:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth">
          {viewedProducts.map((item: any) => (
            <div key={item._id} className="min-w-[70%] sm:min-w-[40%] md:min-w-[28%] lg:min-w-[22%] snap-start">
              <ProductCard
                id={item._id}
                name={item.name}
                originalPrice={item.price}
                salePrice={item.discountPrice || 0}
                images={item.images}
                isSale={item.discountPrice > 0}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}