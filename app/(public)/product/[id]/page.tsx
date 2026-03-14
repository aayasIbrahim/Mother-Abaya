// app/product/[id]/page.tsx
import React from "react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductActionSection from "@/components/public/ProductActionSection";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const productRaw = await Product.findById(id).lean();

  if (!productRaw) {
    return notFound();
  }

  const product = JSON.parse(JSON.stringify(productRaw));

  return (
    <div className="min-h-screen bg-[#FDF7FB] p-6 md:p-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[3rem] shadow-xl border border-pink-50/50">
        {/* Image Section */}
        <div className="relative group rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
          <img
            src={
              typeof product.images[0] === "string"
                ? product.images[0]
                : product.images[0]?.url
            }
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-pink-50 text-[#B3589D] text-[10px] font-black uppercase rounded-lg tracking-widest">
                {product.category || "Collection"}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl text-[#B3589D] font-black tracking-tighter">
              ৳{product.discountPrice || product.price}
            </span>
            {product.discountPrice > 0 && (
              <span className="text-xl text-gray-300 line-through font-bold tracking-tighter">
                ৳{product.price}
              </span>
            )}
          </div>

          <div className="h-px bg-gray-100 w-full" />

          <p className="text-gray-500 leading-relaxed text-lg font-medium">
            {product.description}
          </p>

        
          <ProductActionSection product={product} />
          <div className="pt-4 space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-bold uppercase text-[10px] tracking-[0.2em] text-gray-400">
                Fabric Details:
              </span>
              <span className="text-gray-800 font-black uppercase text-xs">
                {product?.fabric || "Premium Quality"}
              </span>
            </div>
            {/* Quantity Selector - নতুন যোগ করা হয়েছে */}
          </div>
        </div>
      </div>
    </div>
  );
}
