import Product from "../../../model/productModel.js";

export const createProduct = async (req, res) => {
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
    } = req.body;

    if (
      !productName ||
      !productDescription ||
      !productPrice  ||
      !productStatus ||
      !productStockQty 
    ) {
      return res.status(400).json({
        message:
          "All fields are required: productName, productDescription, productPrice, productStatus, productStockQty",
      });
    }

    const newProduct = await Product.create({
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQty,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
};
