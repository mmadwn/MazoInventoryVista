import { Request, Response } from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

// Interface untuk request
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

const getAllProducts = async (
  _req: Request,
  res: Response<ApiResponse<any>>
) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const createProduct = async (
  req: Request<{}, {}, ProductRequest>,
  res: Response<ApiResponse<any>>
) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const product = await Product.create({ name, price, image });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const updateProduct = async (
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
};

const deleteProduct = async (
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
  }


  export { getAllProducts, createProduct, updateProduct, deleteProduct };