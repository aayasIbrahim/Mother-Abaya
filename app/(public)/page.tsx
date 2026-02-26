// app/shop/page.tsx
import React from "react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";

// ক্যাশে ম্যানেজমেন্টের জন্য (যদি ডাটা ঘন ঘন আপডেট হয়)
export const revalidate = 60; 

export default async function ShopPage() {
  await connectDB();

  // ১. ডাটাবেস থেকে প্লেইন অবজেক্ট হিসেবে ডাটা ফেচ করা
  const productsRaw = await Product.find({})
    .sort({ createdAt: -1 })
    .lean();

  // ২. ক্লায়েন্ট কম্পোনেন্টে পাঠানোর আগে সিরিয়ালাইজ করা (Serialization error ফিক্স)
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="min-h-screen bg-[#D6B4CE] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Bar: Sort & Results */}
        <div className="flex justify-between items-center mb-10 border-b border-white/40 pb-5">
          <div>
            <h2 className="text-xl font-black text-gray-800 tracking-tighter uppercase italic">Our Collection</h2>
            <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-widest opacity-70">
              Showing {products.length} unique pieces
            </p>
          </div>
          
          <select className="bg-white/50 border-none text-[10px] md:text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#B3589D]/20 rounded-xl px-4 py-2 cursor-pointer outline-none">
            <option>Sort by latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
            {products.map((item: any) => (
              <ProductCard 
                key={item._id}
                name={item.name}
                // আপনার ডাটাবেস স্কিমা অনুযায়ী ডিসকাউন্ট চেক
                originalPrice={item.price}
                salePrice={item.discountPrice || item.price}
                // প্রথম ছবি রেন্ডার করা (আপনার মঙ্গুজ স্কিমা অনুযায়ী)
                imageUrl={typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url}
                isSale={item.discountPrice > 0} 
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-600 font-bold uppercase tracking-widest">No products found in the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
}