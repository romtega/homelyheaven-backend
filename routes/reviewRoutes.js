import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  createReview,
  getReviewsByProperty,
  updateReviewById,
  deleteReviewById,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:propertyId/reviews", isAuth, createReview);
router.get("/:propertyId/reviews", getReviewsByProperty);
router.put("/reviews/:reviewId", isAuth, updateReviewById);
router.delete("/reviews/:reviewId", isAuth, deleteReviewById);

export default router;
