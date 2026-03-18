"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "@/components/public/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProducts({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-24 mb-10">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 space-y-2">
        <span className="text-[#B3589D] text-xs font-black uppercase tracking-[0.3em]">
          More to Explore
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter text-center">
          Related Products
        </h2>
        <div className="w-16 h-1 bg-[#B3589D] rounded-full" />
      </div>

      {/* Carousel Area - স্লাইডারের বাইরের 'group' সরিয়ে 'slider-container' বা অন্য নাম দিন */}
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
          {products.map((item: any) => (
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
    </div>
  );
}
