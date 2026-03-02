"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "latest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="
    w-full sm:w-auto 
    bg-white/60 backdrop-blur-md 
    border border-white/40 
    text-[11px] font-black uppercase tracking-widest 
    rounded-2xl px-5 py-3 
    shadow-lg shadow-pink-200/20 
    cursor-pointer outline-none 
    appearance-none
    text-center
  "
    >
      <option value="latest">Sort by latest</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
