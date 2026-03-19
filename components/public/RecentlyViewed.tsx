"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getRecentlyViewedProducts } from "@/actions/product.actions";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";;
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

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
      <div className="relative px-4 md:px-0 group/slider">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation={{
            nextEl: ".related-next",
            prevEl: ".related-prev",
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!pb-12"
        >
          {viewedProducts.map((item: any) => (
            <SwiperSlide key={item._id}>
              <ProductCard
                id={item._id}
                name={item.name}
                originalPrice={item.price}
                salePrice={item.discountPrice || 0}
                images={item.images}
                isSale={
                  item.discountPrice > 0 && item.discountPrice < item.price
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - এখন শুধু স্লাইডার এরিয়া হোভার করলে বাটন আসবে */}
        <button className="related-prev absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-4 transition-all duration-300 active:scale-90">
          <ChevronLeft className="text-gray-800" size={24} />
        </button>
        <button className="related-next absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 z-30 w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 group-hover/slider:-translate-x-4 transition-all duration-300 active:scale-90">
          <ChevronRight className="text-gray-800" size={24} />
        </button>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
