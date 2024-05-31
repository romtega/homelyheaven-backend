import mongoose from 'mongoose'

const placeEnum = ['beach', 'city', 'village', 'mountain', 'suburb', 'desert']

const housingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  environment: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  place: { type: String, enum: placeEnum },
  description: { type: String },
  services: {
    wifi: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false }
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  imgUrl: { type: [String], default: [] },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Housing', housingSchema)
