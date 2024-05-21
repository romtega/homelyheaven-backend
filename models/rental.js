import mongoose from 'mongoose'
import { calculateTotalCost, validateDates } from '../middlewares/rentalMiddleware.js'

const rentalSchema = new mongoose.Schema({
  housing: { type: mongoose.Schema.Types.ObjectId, ref: 'Housing', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number },
  isActive: { type: Boolean, default: true, required: true }
}, { timestamps: true })

rentalSchema.pre('save', calculateTotalCost)
rentalSchema.pre('validate', validateDates)

export default mongoose.model('Rental', rentalSchema)
