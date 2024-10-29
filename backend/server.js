import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//create a product
app.post("/api/products", async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, image });

    try {
        const product = await newProduct.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.put("/api/products/:id", async(req, res) => {
    const {id} = req.params
    const {name, price, image}  = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "Product not found"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, image}, {new: true})
        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
})

//delete a product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
});
