import express, { Request, Response } from "express";
import Product from "../models/product.model.ts";
import mongoose from "mongoose";

const router = express.Router();



interface ProductRequest {
    name: string;
    price: number;
    image: string;
  }
  
  // Interface untuk response
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }
  
  // GET all products
  router.get("/", async (_req: Request, res: Response<ApiResponse<any>>) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });
  
  // POST new product
  router.post("/", async (
    req: Request<{}, {}, ProductRequest>, 
    res: Response<ApiResponse<any>>
  ) => {
    const { name, price, image } = req.body;
  
    if (!name || !price || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    try {
      const product = await Product.create({ name, price, image });
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });
  
  // PUT update product
  router.put("/:id", async (
    req: Request<{ id: string }, {}, ProductRequest>,
    res: Response<ApiResponse<any>>
  ) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id, 
        { name, price, image }, 
        { new: true }
      );
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });
  
  // DELETE product
  router.delete("/:id", async (
    req: Request<{ id: string }>, 
    res: Response<ApiResponse<null>>
  ) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  });

export default router;