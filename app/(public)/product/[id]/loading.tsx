"use client"


export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#FDF7FB] p-6 md:p-20 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[3rem] shadow-xl border border-pink-50/50">
        
        {/* Left Side: Image Skeleton */}
        <div className="relative aspect-square rounded-[2.5rem] bg-gray-100 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Right Side: Content Skeleton */}
        <div className="flex flex-col justify-center space-y-8 px-4">
          <div className="space-y-4">
            {/* Category Tag Skeleton */}
            <div className="h-4 w-24 bg-gray-100 rounded-lg"></div>
            {/* Title Skeleton */}
            <div className="h-12 w-3/4 bg-gray-200 rounded-xl"></div>
          </div>
          
          {/* Price Skeleton */}
          <div className="flex items-baseline gap-4">
            <div className="h-10 w-32 bg-pink-100/50 rounded-xl"></div>
            <div className="h-6 w-20 bg-gray-100 rounded-xl"></div>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {/* Description Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-100 rounded-full"></div>
            <div className="h-4 w-full bg-gray-100 rounded-full"></div>
            <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
          </div>

          {/* Size Selector Skeleton */}
          <div className="space-y-4 pt-4">
            <div className="h-3 w-32 bg-gray-100 rounded-full"></div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-14 h-12 bg-gray-50 border border-gray-100 rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Quantity and Button Skeleton */}
          <div className="pt-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
              <div className="h-12 w-32 bg-gray-50 rounded-2xl"></div>
            </div>
            
            {/* Add to Cart Button Skeleton */}
            <div className="w-full h-20 bg-gray-200 rounded-[1.5rem]"></div>
          </div>
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