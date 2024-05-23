import mongoose from 'mongoose'

const housingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  imgUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Housing', housingSchema)
