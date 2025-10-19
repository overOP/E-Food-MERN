import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { initiateKhaltiPayment, verifyKhaltiPayment } from "../../controller/user/payment/paymentController.js";
const router = express.Router();

router.route("/")
.post(isAuthenticated,catchAsync(initiateKhaltiPayment))

router.route("/success")
.get(catchAsync(verifyKhaltiPayment))

export default router;