import express from "express";
import { createProduct } from "../../controller/admin/product/productController.js";
import authCheck from "../../middleware/authCheck..js";
import permitTo from "../../middleware/permitTo.js";
const router = express.Router();

router.route("/create-product").post(authCheck, permitTo("admin"), createProduct);

export default router;
