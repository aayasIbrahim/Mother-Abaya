"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();
  console.log("Pagination rendered with currentPage:", currentPage, "totalPages:", totalPages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
      <div className="hidden sm:block text-[10px] font-black uppercase text-gray-400 tracking-widest">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        <Link
          href={createPageURL(currentPage - 1)}
          className={`p-2 rounded-xl border transition-all ${
            currentPage <= 1 ? "pointer-events-none opacity-20" : "hover:bg-pink-50 text-[#B3589D] border-pink-100"
          }`}
        >
          <ChevronLeft size={18} />
        </Link>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // অনেক বেশি পেজ হলে সব না দেখিয়ে শুধু বর্তমান পেজের আসেপশে দেখানোর লজিক
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <Link
                  key={page}
                  href={createPageURL(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all ${
                    currentPage === page 
                      ? "bg-[#B3589D] text-white shadow-lg shadow-pink-200" 
                      : "hover:bg-pink-50 text-gray-400 border border-transparent hover:border-pink-100"
                  }`}
                >
                  {page}
                </Link>
              );
            }
            return null;
          })}
        </div>

        <Link
          href={createPageURL(currentPage + 1)}
          className={`p-2 rounded-xl border transition-all ${
            currentPage >= totalPages ? "pointer-events-none opacity-20" : "hover:bg-pink-50 text-[#B3589D] border-pink-100"
          }`}
        >
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}