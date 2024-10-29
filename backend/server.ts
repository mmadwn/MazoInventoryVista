import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.ts";
import productRoutes from "./routes/product.route.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use("/api/products", productRoutes);



// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1);
});