import express from "express"
import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from "../controllers/reviewController.js"

const reviewRoutes = express.Router()

reviewRoutes.post("/", createReview)
reviewRoutes.get("/", getAllReviews)
reviewRoutes.get("/:reviewId", getReviewById)
reviewRoutes.put("/:reviewId", updateReview)
reviewRoutes.delete("/:reviewId", deleteReview)

export default reviewRoutes
