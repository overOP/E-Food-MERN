import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { addToCart, deleteCartItem, getAllCartItems, updateCartItems } from "../../controller/user/cart/cartController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,catchAsync(getAllCartItems))
router.route("/:peoductId")
.post(isAuthenticated,catchAsync(addToCart))
.delete(isAuthenticated,catchAsync(deleteCartItem))
.put(isAuthenticated,catchAsync(updateCartItems))


export default router;