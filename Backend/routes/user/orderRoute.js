import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { cancelMyOrder, createOrder, deleteMyOrder, getMyOrders, updateMyOrder } from "../../controller/user/order/orderController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,catchAsync(getMyOrders))
.post(isAuthenticated,catchAsync(createOrder))

router.route("/:id")
.patch(isAuthenticated,catchAsync(updateMyOrder))
.delete(isAuthenticated,catchAsync(deleteMyOrder))

router.route("/cancel")
.patch(isAuthenticated,catchAsync(cancelMyOrder))

export default router;