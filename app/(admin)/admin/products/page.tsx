import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import ProductTable from "@/components/admin/ProductTable";

export default async function ProductsPage() {
  await connectDB();
  
  const productsRaw = await Product.find().sort({ createdAt: -1 }).lean();
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Product Inventory</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your Mother Abaya collection</p>
        </div>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-[#B3589D] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#a04a8b] transition-all shadow-lg"
        >
          <Plus size={20} /> Add New Product
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}