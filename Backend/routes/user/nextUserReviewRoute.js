import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { addProductReview } from "../../controller/user/nextUserController.js";
const router = express.Router();

router.route("/nextreviews/:id").post(isAuthenticated,catchAsync(addProductReview))

export default router;