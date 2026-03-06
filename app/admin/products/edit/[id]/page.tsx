import connectDB from "../../../../../../libs/db";
import Product from "../../../../../../models/Product";
import EditProductForm from "../../../../../../components/admin/EditProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).lean();
  if (!product) notFound();

  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <EditProductForm product={plainProduct} />
    </div>
  );
}
