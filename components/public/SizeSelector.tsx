"use client";

interface Size {
  _id?: string;
  label: string;
  stock: number;
  chest?: string;
  length?: string;
}

interface SizeSelectorProps {
  availableSizes: Size[];
  selectedSize: string | null;
  onSizeSelect: (label: string) => void;
}

const STANDARD_SIZES = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector({
  availableSizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {STANDARD_SIZES.map((label) => {
        const dbData = availableSizes.find(
          (s) => s.label.toUpperCase() === label.toUpperCase(),
        );

        const isUnavailable = !dbData || dbData.stock <= 0;
        const isSelected = selectedSize === label;

        return (
          <button
            key={label}
            disabled={isUnavailable}
            onClick={() => onSizeSelect(label)}
            className={`relative min-w-[58px] h-14 rounded-2xl font-black text-sm transition-all duration-300 border-2 flex flex-col items-center justify-center overflow-hidden ${
              isSelected
                ? "border-[#B3589D] bg-[#B3589D] text-white shadow-xl shadow-pink-100 scale-105"
                : isUnavailable
                  ? "border-gray-800 bg-gray-900 text-gray-500 cursor-not-allowed opacity-90" // কালো ব্যাকগ্রাউন্ড এখানে সেট করা হয়েছে
                  : "border-gray-100 bg-white text-gray-600 hover:border-pink-200 active:scale-95"
            }`}
          >
            <span className="relative z-10">{label}</span>

            {/* আউট অফ স্টক ভিজ্যুয়াল স্ট্রাইক (সাদাটে দাগ কালো ব্যাকগ্রাউন্ডের ওপর ভালো ফুটে উঠবে) */}
            {isUnavailable && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1.2px] bg-gray-700 rotate-[35deg] absolute" />
              </div>
            )}

            {/* স্টক কম থাকলে ডট (শুধুমাত্র এভেলেবল সাইজের জন্য) */}
            {!isUnavailable && dbData && dbData.stock < 5 && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}
