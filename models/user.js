/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/export */
/* eslint-disable comma-dangle */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} no es un correo electrónico válido`,
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["host", "guest", "admin"],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        message: (props) => `${props.value} no es un número de teléfono válido`,
      },
    },
    username: { type: String, unique: true, required: true },
    avatar: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    searchPreferences: {
      location: { type: String },
      radius: { type: Number, default: 10 },
      priceRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 1000 },
      },
    },
    managedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    rentalHistory: [
      {
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        rentedAt: Date,
        duration: Number,
      },
    ],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
