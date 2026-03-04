// app/shop/page.tsx
import React from "react";
import connectDB from "@/libs/db";
import Product from "@/models/Product";
import ProductCard from "@/components/public/ProductCard";
import SortSelector from "@/components/public/SortSelector";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  await connectDB();
  let sortOption: any = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };

  const productsRaw = await Product.find({}).sort(sortOption).lean();
  const products = JSON.parse(JSON.stringify(productsRaw));

  return (
    <div className="min-h-screen bg-[#D6B4CE] p-4 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar: Sort & Results */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 border-b border-white/40 pb-6">
          {/* Left Side: Text Info */}
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic leading-none">
              Our Collection
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#B3589D] hidden md:block"></span>
              <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-[0.2em] opacity-80">
                Showing {products.length} unique pieces
              </p>
            </div>
          </div>

          {/* Right Side: Sort Selector */}
          <div className="w-full sm:w-auto flex justify-end">
            <SortSelector />
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
            {products.map((item: any) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                originalPrice={item.price}
                salePrice={item.discountPrice || item.price}
                imageUrl={
                  typeof item.images[0] === "string"
                    ? item.images[0]
                    : item.images[0]?.url
                }
                isSale={item.discountPrice > 0}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-600 font-bold uppercase tracking-widest">
              No products found in the gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
