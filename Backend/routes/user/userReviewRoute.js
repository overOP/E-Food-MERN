import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { creatReview, deleteReview, editReview, getProductReviews } from "../../controller/user/userController.js";
const router = express.Router();

router.route("/reviews/:id")
.post(isAuthenticated,catchAsync(creatReview))
.get(isAuthenticated,catchAsync(getProductReviews))
.delete(isAuthenticated,catchAsync(deleteReview))
.put(isAuthenticated,catchAsync(editReview))

export default router;