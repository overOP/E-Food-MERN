import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { createOrder, getMyOrders } from "../../controller/user/order/orderController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,catchAsync(getMyOrders))
.post(isAuthenticated,catchAsync(createOrder))

export default router;