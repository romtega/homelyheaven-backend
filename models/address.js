import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true, match: /^[0-9]{5}$/ },
  country: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isActive: { type: Boolean, default: true }

}, { timestamps: true })

const Address = mongoose.model('Address', addressSchema)

export default Address
