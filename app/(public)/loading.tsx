"use client"

import React from "react";

export default function ShopLoading() {
  const skeletonCards = Array(8).fill(null);

  return (
    <div className="min-h-screen bg-[#D6B4CE] p-4 md:p-10 animate-pulse">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar Skeleton: Header সেকশন হুবহু মেইন পেজের মতো */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-white/40 pb-6">
          <div className="space-y-3">
            {/* Title Skeleton */}
            <div className="h-8 md:h-10 w-48 md:w-64 bg-white/40 rounded-lg"></div>
            {/* Subtitle & Line Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-white/20 hidden md:block"></div>
              <div className="h-3 w-32 bg-white/20 rounded-full"></div>
            </div>
          </div>

          {/* Sort Selector Skeleton */}
          <div className="w-full sm:w-auto flex justify-end">
            <div className="h-10 w-full sm:w-40 bg-white/40 rounded-2xl"></div>
          </div>
        </div>

        {/* Product Grid Skeleton: মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {skeletonCards.map((_, index) => (
            <div key={index} className="flex flex-col space-y-5">
              
              {/* Image Box Skeleton (Aspect Ratio 3:4) */}
              <div className="relative aspect-[3/4] bg-white/30 rounded-2xl shadow-inner overflow-hidden">
                {/* Shimmer Effect: একটি হালকা ঝিলিক যাবে */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              
              {/* Text Info Skeleton */}
              <div className="flex flex-col items-center space-y-2 px-2">
                {/* Product Name */}
                <div className="h-3 w-3/4 bg-white/40 rounded-full"></div>
                {/* Price Label */}
                <div className="h-3 w-1/4 bg-white/20 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* কাস্টম শিমার অ্যানিমেশন */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}