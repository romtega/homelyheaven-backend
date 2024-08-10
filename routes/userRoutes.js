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

router.get("/", isAuth, getAllUsers);
router.get("/:userId", isAuth, getUserById);
router.put("/:userId", isAuth, isAdmin, updateUserById);
router.delete("/:userId", isAuth, isAdmin, deleteUserById);

export default router;
