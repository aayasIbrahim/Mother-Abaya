import React from "react";

export default function Loading() {

  const skeletonCards = Array(8).fill(null);

  return (
    <div className="min-h-screen bg-[#D6B4CE] p-4 md:p-10">
      <div className="max-w-7xl mx-auto bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white/20 shadow-2xl">
        
        {/* Top Bar Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-white/40 pb-6">
          <div className="space-y-3">
            {/* Title Skeleton */}
            <div className="h-8 w-48 bg-gray-200/50 rounded-lg animate-pulse"></div>
            {/* Subtitle Skeleton */}
            <div className="h-3 w-32 bg-gray-200/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Sort Selector Skeleton */}
          <div className="h-10 w-full sm:w-40 bg-white/40 rounded-2xl animate-pulse"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {skeletonCards.map((_, index) => (
            <div key={index} className="flex flex-col space-y-4">
              {/* Image Skeleton */}
              <div className="relative aspect-[3/4] bg-gray-200/40 rounded-2xl animate-pulse shadow-inner overflow-hidden">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              
              {/* Info Skeleton */}
              <div className="flex flex-col items-center space-y-2 px-2">
                <div className="h-3 w-3/4 bg-gray-200/60 rounded-full animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-200/40 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

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