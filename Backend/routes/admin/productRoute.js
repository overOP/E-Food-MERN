import express from "express";
import { createProduct } from "../../controller/admin/product/productController.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import permitTo from "../../middleware/permitTo.js";
import upload from "../../middleware/multerConfig.js";
const router = express.Router();

router
  .route("/create-product")
  .post(
    isAuthenticated,
    permitTo("admin"),
    upload.single("productImage"),
    createProduct
  );

export default router;
