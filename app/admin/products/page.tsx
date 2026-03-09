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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Product Inventory
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Manage your Mother Abaya collection
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-[#B3589D] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#a04a8b] transition-all shadow-lg"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>
      <ProductTable products={products} />
      {/* Pagination Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
