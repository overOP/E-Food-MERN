import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import permitTo from "../../middleware/permitTo.js";
import { deleteOrder, getAllOrders, getSingleOrder, updateOrderStatus } from "../../controller/admin/order/orderController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,permitTo("admin"),catchAsync(getAllOrders))

router.route("/:id")
.get(isAuthenticated,permitTo("admin"),catchAsync(getSingleOrder))
.patch(isAuthenticated,permitTo("admin"),catchAsync(updateOrderStatus))
.delete(isAuthenticated,permitTo("admin"),catchAsync(deleteOrder))

export default router;