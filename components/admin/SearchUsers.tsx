"use client";

import { Search, Loader2, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export default function SearchUsers({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(defaultValue);

  useEffect(() => {
    // যদি ইনপুট এবং বর্তমান URL-এর ভ্যালু একই হয়, তবে সার্চ করার দরকার নেই
    const currentQuery = searchParams.get("q") || "";
    if (searchTerm === currentQuery) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        // { scroll: false } নিশ্চিত করে যে পেজ লাফাবে না
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname]);

  return (
    <div className="relative w-full lg:w-96 group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {isPending ? (
          <Loader2 className="text-black animate-spin" size={18} />
        ) : (
          <Search
            className="text-gray-400 group-focus-within:text-black transition-colors"
            size={18}
          />
        )}
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        className="w-full pl-12 pr-10 py-4 bg-white border border-[3px] border-[#B3589D] rounded-[1.5rem] text-sm font-bold shadow-sm outline-none focus:ring-2  focus:ring-[#B3589D] transition-all"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
