import Review from '../models/reviews.js'
import { updateHousingRating } from '../controllers/housingController.js'

export const createReview = async (req, res) => {
  try {
    const reviewData = req.body
    const newReview = new Review(reviewData)
    await newReview.save()
    await updateHousingRating(reviewData.propertyId)
    res.status(201).json(newReview)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    res.status(200).json(reviews)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.status(200).json(review)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true })
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.status(200).json(updatedReview)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.reviewId)
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
