import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { addToCart, deleteCartItem, getAllCartItems } from "../../controller/user/cart/cartController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,catchAsync(getAllCartItems))
router.route("/:peoductId")
.post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteCartItem))


export default router;