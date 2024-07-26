import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/admin/users", isAuth, isAdmin, getAllUsers);
router.get("/admin/users/:userId", isAuth, isAdmin, getUserById);
router.put("/admin/users/:userId", isAuth, isAdmin, updateUserById);
router.delete("/admin/users/:userId", isAuth, isAdmin, deleteUserById);

export default router;
