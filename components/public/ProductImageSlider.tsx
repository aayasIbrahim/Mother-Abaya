"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductImageSlider({ images }: { images: any[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const imageList = images.map((img) =>
    typeof img === "string" ? img : img?.url
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Main Slider */}
      <div className="relative group rounded-xl overflow-hidden bg-white border border-gray-100">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="aspect-[3/4] md:aspect-[4/5] w-full"
        >
          {imageList.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}

          {/* Sale Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded shadow-sm">
             <span className="text-[10px] font-black uppercase text-gray-900 tracking-tighter">Sale!</span>
          </div>

          {/* Full Screen Icon (Bottom Right) */}
          <button className="absolute bottom-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-lg text-gray-700 hover:bg-white transition-all shadow-sm">
             <Maximize2 size={18} />
          </button>

          {/* Custom Navigation Arrows */}
          <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronLeft size={24} />
          </button>
          <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight size={24} />
          </button>
        </Swiper>
      </div>

      {/* Thumbnails */}
      <div className="px-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumb-swiper h-24"
        >
          {imageList.map((url, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="w-full h-full rounded-md overflow-hidden border-2 transition-all swiper-slide-thumb-active:border-gray-900 border-transparent grayscale-[0.5] swiper-slide-thumb-active:grayscale-0 shadow-sm">
                <img src={url} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}