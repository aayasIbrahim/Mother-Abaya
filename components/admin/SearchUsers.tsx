"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SearchUsers({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(window.location.search);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.push(`/admin/users?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full lg:w-96 group">
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isPending ? "text-blue-500 animate-pulse" : "text-gray-400"}`}
        size={18}
      />
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-black transition-all"
      />
    </div>
  );
}
