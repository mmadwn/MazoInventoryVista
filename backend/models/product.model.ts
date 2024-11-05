import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Product = model<IProduct>("Product", productSchema); 

export default Product;