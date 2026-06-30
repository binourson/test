// routes/productRoutes.js — maps product URLs to controller functions (the "menu").

import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router(); // a mini, self-contained Express router

// IMPORTANT: these paths are RELATIVE to where this router is mounted in app.js.
// We'll mount it at "/products", so "/" here means the full path "/products".
router.get("/", getAllProducts);    //  GET  /products      -> getAllProducts
router.get("/:id", getProductById); //  GET  /products/:id  -> getProductById
router.put("/:id", updateProduct); //  PUT  /products/:id  -> updateProduct
router.delete("/:id", deleteProduct); //  DELETE /products/:id -> deleteProduct
router.post("/", createProduct);    //  POST /products      -> createProduct

export default router;
