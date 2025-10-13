import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "productName is required"],
  },
  productDescription: {
    type: String,
    required: [true, "productDescription is required"],
  },
  productPrice: {
    type: Number,
    required: [true, "productPrice is required"],
  },
  productStatus: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
    required: [true, "productStatus is required"],
  },
  productStockQty: {
    type: Number,
    required: [true, "productStockQty is required"],
  },
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;
