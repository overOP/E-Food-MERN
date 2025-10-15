import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import { getUser } from "../../controller/admin/user/userController.js";
import permitTo from "../../middleware/permitTo.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/users").get(isAuthenticated,permitTo("admin"),catchAsync(getUser))


export default router;