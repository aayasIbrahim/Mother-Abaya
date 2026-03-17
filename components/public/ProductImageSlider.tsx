"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductImageSlider({ images }: { images: any[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageList = images.map((img) =>
    typeof img === "string" ? img : img?.url,
  );

  return (
    <PhotoProvider>
      <div className="flex flex-col gap-4">
        {/* Main Slider Area */}
        <div className="relative group rounded-xl overflow-hidden bg-white border border-gray-100">
          <Swiper
            loop={true}
            spaceBetween={10}
            // স্লাইড চেঞ্জ হলে ইনডেক্স আপডেট করবে যাতে Maximize বাটন সঠিক ইমেজ পায়
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="aspect-[3/4] md:aspect-[4/5] w-full"
          >
            {imageList.map((url, index) => (
              <SwiperSlide key={index}>
                <PhotoView src={url}>
                  <img
                    src={url}
                    alt="Product Preview"
                    className="w-full h-full object-cover cursor-zoom-in"
                  />
                </PhotoView>
              </SwiperSlide>
            ))}

            {/* Sale Badge */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-2 py-1 rounded shadow-sm">
              <span className="text-[10px] font-black  text-gray-900 r">
                Sale!
              </span>
            </div>

            {/* Maximize Icon (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-10">
              <PhotoView src={imageList[activeIndex]}>
                <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-lg text-gray-500 hover:text-pink-600 transition-all shadow-md active:scale-90">
                  <Maximize2 size={18} />
                </button>
              </PhotoView>
            </div>

            {/* Custom Navigation Arrows */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-xl text-gray-900 border border-gray-50 hover:bg-gray-50 transition-all active:scale-90">
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-xl text-gray-900 border border-gray-50 hover:bg-gray-50 transition-all active:scale-90">
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </Swiper>
        </div>

        {/* Thumbnails Section */}
        <div className="px-1">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumb-swiper h-20 md:h-24"
          >
            {imageList.map((url, index) => (
              <SwiperSlide key={index} className="cursor-pointer group">
                <div
                  className="w-full h-full rounded-lg overflow-hidden border-2 transition-all duration-300 
                  border-transparent opacity-50 grayscale scale-95
                  [.swiper-slide-thumb-active_&]:border-pink-600
                  [.swiper-slide-thumb-active_&]:opacity-100 
                  [.swiper-slide-thumb-active_&]:grayscale-0 
                  [.swiper-slide-thumb-active_&]:scale-100 
                  shadow-sm"
                >
                  <img
                    src={url}
                    alt={`thumbnail-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </PhotoProvider>
  );
}