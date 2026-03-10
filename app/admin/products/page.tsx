import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import ProductTable from "@/components/admin/ProductTable";
import Pagination from "@/components/admin/Pagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await connectDB();

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  // ১. ডাটাবেস থেকে ডাটা এবং টোটাল কাউন্ট একসাথে আনা (Performance optimized)
  const [productsRaw, totalProducts] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(),
  ]);

  const products = JSON.parse(JSON.stringify(productsRaw));

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all">
        {/* Left Side: Title & Info */}
        <div className="space-y-3 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              Product Inventory
            </h1>
            {/* Total Products Badge - Now inline and looking professional */}
            <span className="bg-pink-50 text-[#B3589D] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-pink-100">
              {totalProducts} Items
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Manage and monitor your Mother Abaya collection
          </p>
        </div>

        {/* Right Side: Action Button */}
        <Link
          href="/admin/products/add"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#B3589D] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#a04a8b] active:scale-95 transition-all shadow-lg shadow-pink-100"
        >
          <Plus size={18} strokeWidth={3} /> Add New Product
        </Link>
      </div>
      <ProductTable products={products} />
      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
