// models/Product.js — defines what a "Product" looks like in MongoDB.

import mongoose from "mongoose";

// 1) The SCHEMA: the shape + rules of a product document.
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // text, mandatory
    price: { type: Number, required: true, min: 0 }, // number, mandatory, never negative
    description: { type: String, default: "" },      // text, optional (empty by default)
    inStock: { type: Boolean, default: true },       // true/false, defaults to true
  },
  { timestamps: true } // auto-add "createdAt" and "updatedAt" fields on each document
);

// 2) The MODEL: the tool we use to read/write products in the database.
//    Mongoose stores them in a collection named "products" (lowercased + pluralized).
const Product = mongoose.model("Product", productSchema);

export default Product; // default export -> imported without { } elsewhere
