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
  const mainImage = images?.[0] || "/placeholder.jpg";
  const secondaryImage = images?.length > 1 ? images[1] : mainImage;
  const discountPercentage = Math.round(
    ((originalPrice - salePrice) / originalPrice) * 100
  );

  return (
    // এখানে 'group' থাকা মানে শুধুমাত্র এই কার্ডটি হোভার হলে ভেতরের এলিমেন্ট কাজ করবে
    <Link href={`/product/${id}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
        
        {/* Sale Tag */}
        {isSale && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-20 flex items-start">
            <span className="bg-pink-200 text-black text-[9px] font-bold px-2 py-0.5 shadow-sm uppercase tracking-tighter">
              {discountPercentage <= 8 ? "Sale !" : `-${discountPercentage}%`}
            </span>
          </div>
        )}

        {/* Main Image */}
        <img
          src={mainImage}
          alt={name}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />

        {/* Secondary Image */}
        {images?.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${name} secondary`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Eye Icon */}
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="bg-pink-200 px-2 py-0.5 shadow-sm border border-gray-100 flex items-center justify-center">
            <Eye size={14} className="text-gray-900" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 text-center space-y-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>
        <div className="flex justify-center items-center gap-2 text-sm">
          {isSale && (
             <span className="text-gray-400 line-through">
               ৳{originalPrice.toLocaleString()}
             </span>
          )}
          <span className="text-gray-900 font-bold">
            ৳{salePrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}