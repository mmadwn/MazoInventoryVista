import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// POST new product
router.post("/", createProduct);

// PUT update product
router.put("/:id", updateProduct);

// DELETE product
router.delete("/:id", deleteProduct);

export default router;
