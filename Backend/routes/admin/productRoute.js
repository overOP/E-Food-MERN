import express from "express";
import { createProduct, getProduct, getProducts } from "../../controller/admin/product/productController.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import permitTo from "../../middleware/permitTo.js";
import upload from "../../middleware/multerConfig.js";
import catchAsync from "../../services/error/catchAsync.js";
const router = express.Router();

router.route("/products")
.post(catchAsync(isAuthenticated),permitTo("admin"),upload.single("productImage"),catchAsync(createProduct))
.get(catchAsync(getProducts));

router.route("/products/:id").get(catchAsync(getProduct));

export default router;
