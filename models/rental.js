import mongoose from ' mongoose'
import Housing from '../models/housing.js'

const rentalSchema = new mongoose.Schema({
  housing: { type: mongoose.Schema.Types.ObjectId, ref: 'Housing', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  }
}, { timestamps: true })

rentalSchema.methods.calculateTotalCost = async function () {
  const housing = await Housing.findById(this.housing)
  if (!housing) {
    throw new Error('Housing not found')
  }

  const oneDay = 24 * 60 * 60 * 1000
  const duration = Math.round(Math.abs((this.endDate - this.startDate) / oneDay))

  this.totalCost = duration * housing.price
  return this.totalCost
}

rentalSchema.pre('save', async function (next) {
  try {
    await this.calculateTotalCost()
    next()
  } catch (error) {
    next(error)
  }
})

export default mongoose.model('Rental', rentalSchema)
