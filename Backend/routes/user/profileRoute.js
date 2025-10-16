import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { deleteMyProfile, getMyProfile, updateMyPassword, updateMyProfile } from "../../controller/user/profile/profileController.js";
const router = express.Router();

router.route("/")
.get(isAuthenticated,catchAsync(getMyProfile))
.delete(isAuthenticated,catchAsync(deleteMyProfile))
.patch(isAuthenticated,catchAsync(updateMyProfile))

router.route("/changePassword").patch(isAuthenticated,catchAsync(updateMyPassword))

export default router;
