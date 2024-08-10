import Review from "../models/review.js";
import Property from "../models/property.js";

const createReview = async (req, res) => {
  const { propertyId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    const review = new Review({
      user: userId,
      property: propertyId,
      rating,
      comment,
    });

    await review.save();
    return res.status(201).json(review);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating review: ${error.message}` });
  }
};

const getReviewsByProperty = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const reviews = await Review.find({ property: propertyId }).populate({
      path: "user",
      select: "firstName lastName username", // Selecciona los campos que necesitas
    });
    if (!reviews.length) {
      return res
        .status(404)
        .json({ msg: "No reviews found for this property" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error retrieving reviews: ${error.message}` });
  }
};

const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error updating review: ${error.message}` });
  }
};

const deleteReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error deleting review: ${error.message}` });
  }
};

export {
  createReview,
  getReviewsByProperty,
  updateReviewById,
  deleteReviewById,
};
