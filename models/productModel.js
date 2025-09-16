import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    stockQty: { type: Number, default: 0 },
    isActive: { type: Number, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("product", productSchema);
