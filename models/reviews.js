import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

reviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
