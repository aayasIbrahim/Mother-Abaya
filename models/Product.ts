import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    discountPrice: { type: Number },
    images: [{ type: String, required: true }],
    sizes: [{ type: String, enum: ["S", "M", "L", "XL"], default: ["S"] }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
