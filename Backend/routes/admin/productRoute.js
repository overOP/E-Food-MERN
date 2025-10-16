import express from "express";
import { createProduct, deleteProduct, editProduct} from "../../controller/admin/product/productController.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import permitTo from "../../middleware/permitTo.js";
import upload from "../../middleware/multerConfig.js";
import catchAsync from "../../services/error/catchAsync.js";
import { getProduct, getProducts } from "../../controller/global/globalConntroller.js";
const router = express.Router();

router.route("/")
.post(isAuthenticated,permitTo("admin"),upload.single("productImage"),catchAsync(createProduct))
.get(catchAsync(getProducts));

router.route("/:id")
.get(catchAsync(getProduct))
.delete(isAuthenticated,permitTo("admin"),catchAsync(deleteProduct))
.put(isAuthenticated,permitTo("admin"),upload.single("productImage"),catchAsync(editProduct));

export default router;
