// controllers/productController.js — the LOGIC behind each product route.
// Each function is a route handler: it receives (req, res) and sends a response.

import Product from "../models/Product.js";
import redisClient from "../config/redis.js"; // the default-exported Redis client

// GET /products -> return ALL products
export async function getAllProducts(req, res) {
  // 1) Try the cache first.
  const cached = await redisClient.get("products");
  if (cached) {
    console.log("⚡ products served from Redis cache");
    return res.json(JSON.parse(cached)); // cache HIT: parse the stored JSON string back to objects
  }

  // 2) cache MISS: read from MongoDB.
  console.log("🐢 products served from MongoDB (caching for next time)");
  const products = await Product.find();

  // 3) Cache the result; expire after 60 seconds (TTL). Redis stores strings only.
  await redisClient.set("products", JSON.stringify(products), { EX: 60 });

  res.json(products);
}

// GET /products/:id -> return ONE product by its id
export async function getProductById(req, res) {
  const product = await Product.findById(req.params.id); // req.params.id = the ":id" from the URL
  if (!product) {
    // "not found" isn't an error Mongoose throws, so we create one and throw it.
    // Express 5 forwards it to errorHandler, which sees statusCode 404.
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  res.json(product);
}

// PUT /products/:id -> update an existing product
export async function updateProduct(req, res) {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  await redisClient.del("products"); // invalidate the cached list of products
  res.json(updated);
}

// DELETE /products/:id -> delete a product
export async function deleteProduct(req, res) {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  await redisClient.del("products"); // invalidate the cached list of products
  res.json(deleted);
}

// POST /products -> create a new product
export async function createProduct(req, res) {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  await redisClient.del("products"); // invalidate the cached list of products
  res.status(201).json(saved); // 201 = "Created"
}
