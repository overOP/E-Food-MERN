import Product from "../../../model/productModel.js";
import fs from "fs" //file system

export const createProduct = async (req, res) => {
    const file =(req.file)
    let filePath
    if(!file){
      filePath = "https://www.istockphoto.com/vector/clearly-plainly-gm1313962781-402320468"
    }else{
      filePath = req.file.filename
    }
      const {productName,productDescription,productPrice,productStatus,productStockQty,} = req.body;
  
      if (!productName ||!productDescription ||!productPrice  ||!productStatus ||!productStockQty ) {
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
        productImage: process.env.BASE_URL + filePath
      });
  
      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
};


export const getProducts = async (req, res) => {
    const products = await Product.find();
    // check if products exist
    if (!products) {
      return res.status(404).json({
        message: "Products not found",
        products : [], // empty array if products not found
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    if(!id){
      return res.status(400).json({
        message: "Product id is required",
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        product: [],
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product: product,
    });
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({
      message: "Product id is required",
    });
  }
  const oldData = await Product.findById(id);
  if(!oldData){
    return res.status(404).json({
      message: "Product not found",
      product: [],
    });
  }
  const oldProductImage = oldData.productImage;
  const leghToCut = process.env.BASE_URL.length;
  const finalPathAfterCut = oldProductImage.slice(leghToCut);
  fs.unlink("./uploads/" + finalPathAfterCut, (err) => {
    if (err) {
      console.log("Error deleting file:", err);
    }else{
      console.log("File deleted successfully");
    }
  })

  await Product.findByIdAndDelete(id);
  return res.status(200).json({
    message: "Product deleted successfully",
  });
};

export const editProduct = async (req, res) => {
  const {id} = req.params;
  const {productName,productDescription,productPrice,productStatus,productStockQty,} = req.body;
  if (!productName ||!productDescription ||!productPrice  ||!productStatus ||!productStockQty || !id) {
    return res.status(400).json({
      message:
        "All fields are required: productName, productDescription, productPrice, productStatus, productStockQty, id",
    });
  }
  const oldData = await Product.findById(id);
  if(!oldData){
    return res.status(404).json({
      message: "Product not found",
      product: [],
    });
  }
  const oldProductImage = oldData.productImage;
  const leghToCut = process.env.BASE_URL.length;
  const finalPathAfterCut = oldProductImage.slice(leghToCut);
  if(req.file && req.file.filename){
    //remove file from uploads folder
    fs.unlink("./uploads/" + finalPathAfterCut, (err) => {
      if (err) {
        console.log("Error deleting file:", err);
      }else{
        console.log("File deleted successfully");
      }
    })
  }
 const updatedProduct = await Product.findByIdAndUpdate(id, {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
    productImage: req.file && req.file.filename ? process.env.BASE_URL + req.file.filename : oldProductImage
  },{
    new: true
  });
  return res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
}