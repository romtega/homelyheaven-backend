import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/admin/properties", isAuth, isAdmin, createProperty);
router.get("/admin/properties", isAuth, isAdmin, getAllProperties);
router.get("/admin/properties/:propertyId", isAuth, isAdmin, getPropertyById);
router.patch(
  "/admin/properties/:propertyId",
  isAuth,
  isAdmin,
  updatePropertyById
);
router.delete(
  "/admin/properties/:propertyId",
  isAuth,
  isAdmin,
  deletePropertyById
);

export default router;
