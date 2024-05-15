import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    imageUrl: { type: String },
    stockQuantity: { type: Number, required: true },
});

export const ProductModel = mongoose.model("products", productSchema);
