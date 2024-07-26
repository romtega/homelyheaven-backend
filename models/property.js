import mongoose from "mongoose";

const environmentEnum = ["playa", "ciudad", "montaña", "desierto"];

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true, match: /^[0-9]{5}$/ },
      country: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    pricePerNight: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    environment: { type: String, enum: environmentEnum, required: true },
    amenities: {
      wifi: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      pool: { type: Boolean, default: false },
      airConditioning: { type: Boolean, default: false },
      heating: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      laundry: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    images: [{ type: String }],
    availability: {
      type: [
        {
          startDate: { type: Date, required: true },
          endDate: { type: Date, required: true },
        },
      ],
      default: [],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
