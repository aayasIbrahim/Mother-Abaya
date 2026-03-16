import Link from "next/link";
import { Eye } from "lucide-react";

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
  const discountPercentage = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  );
  return (
    <Link href={`/product/${id}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
        {/* Sale Tag */}

        {isSale && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-20 flex items-start">
            {/* ৮% এর সমান বা কম হলে শুধু "Sale" দেখাবে */}
            {discountPercentage <= 8 ? (
              <span className="bg-pink-200 text-black text-[9px] font-bold px-2 py-0.5 shadow-sm uppercase tracking-tighter">
                Sale !
              </span>
            ) : (
              /* ৮% এর বেশি হলে শুধু পারসেন্টেজ দেখাবে */
              <span className="bg-pink-200 text-black text-[9px] font-bold px-2 py-0.5 shadow-sm tracking-tighter">
                -{discountPercentage}%
              </span>
            )}
          </div>
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
        {/* Eye Icon Overlay - Top Right Positioning */}
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="bg-pink-200 px-2 py-0.5 shadow-sm border border-gray-100 flex items-center justify-center">
            <Eye size={14} className="text-gray-900" />
          </div>
        </div>
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
