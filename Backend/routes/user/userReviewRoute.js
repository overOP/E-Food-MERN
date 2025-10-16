import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import {  creatReview, deleteReview, editReview, getMyReviews } from "../../controller/user/review/reviewController.js";
import permitTo from "../../middleware/permitTo.js";
const router = express.Router();

router.route("/").get(isAuthenticated,catchAsync(getMyReviews))

router.route("/:id")
.post(isAuthenticated,permitTo("user"),catchAsync(creatReview))
.delete(isAuthenticated,catchAsync(deleteReview))
.put(isAuthenticated,catchAsync(editReview))

export default router;