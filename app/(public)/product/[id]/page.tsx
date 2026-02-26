// app/product/[id]/page.tsx
import React from "react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-[3rem] shadow-xl">
        <div className="rounded-[2rem] overflow-hidden bg-gray-50 border">
          <img
            src={
              typeof product.images[0] === "string"
                ? product.images[0]
                : product.images[0]?.url
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-black text-gray-800 uppercase italic tracking-tighter">
            {product.name}
          </h1>

          <div className="flex items-center gap-4">
            {product.discountPrice > 0 && (
              <span className="text-2xl text-gray-400 line-through font-medium">
                ৳{product.price}
              </span>
            )}
            <span className="text-4xl text-[#B3589D] font-black">
              ৳{product.discountPrice || product.price}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-bold uppercase text-xs tracking-widest text-gray-400">
                Fabric:
              </span>
              <span className="text-gray-700 font-bold uppercase">
                {product.details?.fabric || "Premium Quality"}
              </span>
            </div>

            <button className="w-full bg-[#B3589D] text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-[#9c4a88] transition-all active:scale-95">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
