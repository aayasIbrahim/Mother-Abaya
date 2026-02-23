import React from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
// import { deleteProduct } from "@/libs/actions/product";
import { toast } from "react-hot-toast";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Product Inventory</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your Mother Abaya collection</p>
        </div>
        <Link 
          href="/admin/products/add" 
          className="flex items-center gap-2 bg-[#B3589D] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#a04a8b] transition-all shadow-lg shadow-pink-100"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">Product</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">Category</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">Price</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500">Stock</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-100">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-gray-700">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-pink-50 text-[#B3589D] text-[10px] font-black uppercase rounded-lg">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">৳ {product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">{product.stock} pcs</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      
                      {/* Delete Button with Server Action */}
                      <form action={async () => {
                        "use server";
                        // await deleteProduct(product._id.toString());
                      }}>
                        <button className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center gap-2">
                      <Package size={40} className="text-gray-200" />
                      No products found. Start adding some!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}