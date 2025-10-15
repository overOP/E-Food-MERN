import Product from "../../model/productModel.js";

export const addProductReview = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const { rating, message } = req.body;
  if (!rating || !message || !productId) {
    return res.status(400).json({
      message: "All fields are required : rating, message, productId",
    });
  }
  //check if that productId product exists or not
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  const review = {
    userId,
    rating,
    message,
  }
  productExists.reviews.push(review);
  await productExists.save();
  return res.status(200).json({
    message: "Review added successfully",
  });
};