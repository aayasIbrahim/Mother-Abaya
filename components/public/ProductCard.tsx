import React from "react";
import Link from "next/link";

interface ProductProps {
  name: string;
  id: string;
  originalPrice: number;
  salePrice: number;
  images: string[];
  isSale?: boolean;
}

export default function ProductCard({
  id,
  name,
  originalPrice,
  salePrice,
  images,
  isSale,
}: ProductProps) {
  // প্রথম ছবি (Main) এবং দ্বিতীয় ছবি (Hover) সেট করা
  const mainImage = images?.[0] || "/placeholder.jpg";
  const secondaryImage = images?.length > 1 ? images[1] : mainImage;
  return (
    <Link href={`/product/${id}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
        {/* Sale Tag */}
        {isSale && (
          <span className="absolute top-2 left-2 z-10 bg-white text-[10px] font-bold px-2 py-0.5 shadow-sm uppercase">
            Sale!
          </span>
        )}

        {/* Image */}
        <img
          src={mainImage}
          alt={name}
          className={`
            w-full h-full object-cover transition-opacity duration-700 ease-in-out
            group-hover:opacity-0
          `}
        />

        {/* Secondary Image (হোভার করলে যা আসবে) */}
        {images?.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${name} secondary`}
            className={`
              absolute inset-0 w-full h-full object-cover 
              transition-all duration-700 ease-in-out 
              opacity-0 group-hover:opacity-100 group-hover:scale-105
            `}
          />
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-center space-y-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">
          {name}
        </h3>
        <div className="flex justify-center items-center gap-2 text-sm">
          <span className="text-gray-900 line-through">
            ৳{originalPrice.toLocaleString()}
          </span>
          <span className="text-gray-900 font-bold">
            ৳{salePrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
