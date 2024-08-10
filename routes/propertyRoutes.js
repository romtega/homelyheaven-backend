import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { isHost } from "../middleware/isHost.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:propertyId", getPropertyById);
router.post("/", isAuth, isAdmin, createProperty);
router.patch("/:propertyId", isAuth, isAdmin, isHost, updatePropertyById);
router.delete("/:propertyId", isAuth, isAdmin, deletePropertyById);

export default router;
