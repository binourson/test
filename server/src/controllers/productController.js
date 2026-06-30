// controllers/productController.js — the LOGIC behind each product route.
// Each function is a route handler: it receives (req, res) and sends a response.

import Product from "../models/Product.js"; // "../" goes UP one folder (controllers -> src), then into models

// GET /products -> return ALL products
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  res.json(deleted);
}

// POST /products -> create a new product
export async function createProduct(req, res) {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved); // 201 = "Created"
}
