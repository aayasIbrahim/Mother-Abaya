"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, Package } from "lucide-react";
import { deleteProduct } from "@/actions/product.actions";
import { toast } from "react-hot-toast";

export default function ProductTable({ products }: { products: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result?.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(result?.error || "Failed to delete product");
      }
    });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">
                Product
              </th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">
                Stock
              </th>
              <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr
                key={product._id}
                className={`hover:bg-gray-50/50 transition-colors ${isPending ? "opacity-50 pointer-events-none" : ""}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        typeof product.images[0] === "string"
                          ? product.images[0]
                          : product.images[0]?.url || "/placeholder.png"
                      }
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                      alt={product.name}
                    />
                    <span className="font-bold text-gray-700">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-pink-50 text-[#B3589D] text-[10px] font-black uppercase rounded-lg">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-800">
                  ৳ {product.price}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  {product.stock} pcs
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
