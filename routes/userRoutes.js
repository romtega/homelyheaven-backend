import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  upload,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", isAuth, getAllUsers);
router.get("/:userId", isAuth, getUserById);
router.patch("/:userId", isAuth, upload.single("avatar"), updateUserById);
router.delete("/:userId", isAuth, isAdmin, deleteUserById);

export default router;
