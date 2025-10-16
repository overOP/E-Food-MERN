import Product from "../../model/productModel.js";
import Review from "../../model/reviewModel.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  // check if products exist
  if (!products) {
    return res.status(404).json({
      message: "Products not found",
      data: [], // empty array if products not found
    });
  }
  return res.status(200).json({
    message: "Products fetched successfully",
    data: products,
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Product id is required",
    });
  }
  const product = await Product.findById(id);
  const productReviews = await Review.find({ productId: id }).populate(
    "userId"
  );
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      data: { data: [], data2: [] },
    });
  }
  return res.status(200).json({
    message: "Product fetched successfully",
    data: { product, productReviews },
  });
};
