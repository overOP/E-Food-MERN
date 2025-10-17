import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import permitTo from "../../middleware/permitTo.js";
import { getAllOrders } from "../../controller/admin/order/orderController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,permitTo("admin"),catchAsync(getAllOrders))

export default router;