import express from "express";
import catchAsync from "../../services/error/catchAsync.js";
import { deleteUser, editUser, getUser } from "../../controller/admin/user/userController.js";
import permitTo from "../../middleware/permitTo.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/users").get(isAuthenticated,permitTo("admin"),catchAsync(getUser))
router.route("/users/:id")
.delete(isAuthenticated,permitTo("admin"),catchAsync(deleteUser))
.put(isAuthenticated,permitTo("admin"),catchAsync(editUser))

export default router;