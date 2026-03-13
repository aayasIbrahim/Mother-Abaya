import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    discountPrice: { type: Number },
    images: [{ type: String, required: true }],
    sizes: [
      {
        label: { type: String, required: true },
        chest: { type: String },
        length: { type: String },
        stock: { type: Number, default: 0 },
      },
    ],
    stock: { type: Number, default: 0 },
    fabric: { type: String },
    isSale: { type: Boolean },
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
