import Property from "../models/property.js";
import User from "../models/user.js";

import multer from "multer";
import { tmpdir } from "os";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = multer.diskStorage({
  destination: tmpdir(),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const createProperty = async (req, res) => {
  const imageUrls = [];
  if (req.files) {
    try {
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    } catch (uploadError) {
      return res.status(500).json({ msg: "Image upload failed" });
    }
  }
  try {
    const property = new Property({
      ...req.body,
      images: imageUrls,
    });
    await property.save();
    return res.status(201).json(property);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating property: ${error.message}` });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isActive: true }).populate({
      path: "owner",
      select: "firstName lastName",
    });
    return res.status(200).json(properties);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error retrieving properties: ${error.message}` });
  }
};

const getPropertyById = async (req, res) => {
  const propertyId = req.params.propertyId;

  if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid property ID format" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property || !property.isActive) {
      return res.status(404).json({ msg: "Property not found or inactive" });
    }
    return res.status(200).json(property);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error retrieving property: ${error.message}` });
  }
};

const updatePropertyById = async (req, res) => {
  const propertyId = req.params.propertyId;

  if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid property ID format" });
  }

  const imageUrls = [];

  // Si se envían archivos, subimos las nuevas imágenes a Cloudinary
  if (req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    } catch (uploadError) {
      return res.status(500).json({ msg: "Image upload failed" });
    }
  }

  try {
    const updateData = { ...req.body };

    // Si se subieron nuevas imágenes, actualizamos el campo images
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const property = await Property.findByIdAndUpdate(propertyId, updateData, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    return res.status(200).json(property);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error updating property: ${error.message}` });
  }
};

const deletePropertyById = async (req, res) => {
  const propertyId = req.params.propertyId;

  if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid property ID format" });
  }

  if (req.query.destroy === "true") {
    try {
      const property = await Property.findByIdAndDelete(propertyId);
      if (!property) {
        return res.status(404).json({ msg: "Property not found" });
      }
      return res.status(204).json();
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error deleting property: ${error.message}` });
    }
  }

  try {
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { isActive: false },
      { new: false }
    );
    if (!property || !property.isActive) {
      return res
        .status(404)
        .json({ msg: "Property not found or already inactive" });
    }
    return res.status(204).json();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error deactivating property: ${error.message}` });
  }
};

export {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  upload,
};
