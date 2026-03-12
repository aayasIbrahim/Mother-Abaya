"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const TopBanner = ({ settings }: { settings: any }) => {
  if (!settings?.showAddress || !settings?.address) return null;
  return (
    // overflow-hidden জরুরি যাতে অ্যানিমেশনের সময় সাইডবার না আসে
    <div className="w-full overflow-hidden bg-[#D8AED3] shadow-sm">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [-30, 0, 0, 30], // মোবাইলের জন্য x-axis মুভমেন্ট একটু কমানো হয়েছে
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          times: [0, 0.1, 0.9, 1],
        }}
        // py-2 (mobile) থেকে py-2.5 (desktop) করা হয়েছে
        className="py-2 md:py-2.5 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            {/* আইকনটি মোবাইলে আরও ছোট (size 12) এবং ডেস্কটপে (size 14) */}
            <MapPin size={12} className="shrink-0 opacity-90 md:size-[14px]" />

            <p className="text-center text-[9px] leading-tight font-bold uppercase tracking-[0.05em] sm:text-[10px] md:text-xs md:tracking-[0.15em]">
              {/* মোবাইলে টেক্সট ব্রেকিং কন্ট্রোল করার জন্য whitespace-normal */}
              <span className="inline-block whitespace-normal md:whitespace-nowrap">
                {settings.address}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopBanner;
