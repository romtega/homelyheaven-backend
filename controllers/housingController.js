import Housing from '../models/housing.js'
import Address from '../models/address.js'
import Review from '../models/reviews.js'
import multer from 'multer'
import { tmpdir } from 'os'
import { v2 as cloudinary } from 'cloudinary'

const storage = multer.diskStorage({
  destination: tmpdir(),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage
})

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET

})

const createHousing = async (req, res) => {
  try {
    const housingData = req.body
    if (!housingData) {
      return res.status(400).json({ msg: 'Housing data is missing' })
    }

    if (!housingData.address) {
      return res.status(400).json({ msg: 'Address data is missing' })
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path))
      const uploadResults = await Promise.all(uploadPromises)
      housingData.imgUrl = uploadResults.map(result => result.secure_url)
    } else {
      housingData.imgUrl = []
    }

    const existingAddress = await Address.findOne({
      street: housingData.address.street,
      city: housingData.address.city,
      state: housingData.address.state,
      postalCode: housingData.address.postalCode,
      country: housingData.address.country
    })

    if (!existingAddress) {
      const newAddress = new Address(housingData.address)
      await newAddress.save()
      housingData.address = newAddress._id
    } else {
      housingData.address = existingAddress._id
    }

    const newHousing = new Housing(housingData)
    await newHousing.save()

    const populatedHousing = await Housing.findById(newHousing._id).populate('address')

    res.status(201).json(populatedHousing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllHousing = async (req, res) => {
  try {
    const housings = await Housing.find({ isActive: true }).populate('address')
    if (!housings) {
      return res.status(404).json({ msg: 'housings no found' })
    }
    res.status(200).json(housings)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getHousingById = async (req, res) => {
  if (!req.params.housingId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }
  try {
    const housing = await Housing.findById({ _id: req.params.housingId, isActive: true }).populate('address')
    if (!housing) {
      return res.status(404).json({ msg: 'housing not found' })
    }
    res.status(200).json(housing)
  } catch (error) {
    res.status({ error: error.message })
  }
}

const updateHousingById = async (req, res) => {
  if (!req.params.housingId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }

  try {
    const housing = await Housing.findByIdAndUpdate(req.params.housingId, req.body, { new: true })
    if (!housing) {
      return res.status(404).json({ msg: 'housing not found' })
    }
    res.status(200).json(housing)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteHousingById = async (req, res) => {
  if (!req.params.housingId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const housing = await Housing.findByIdAndDelete(req.params.housingId)
      if (!housing) {
        return res.status(404).json({ msg: 'housing not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const housing = await Housing.findByIdAndUpdate(req.params.housingId, { isActive: false }, { new: false })

    if (!housing || housing.isActive === false) {
      return res.status(404).json({ msg: 'housing not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getHousingQuery = async (req, res) => {
  const querysDB = { isActive: true }

  const housingKeys = ['name', 'type', 'price', 'bedrooms', 'bathrooms']
  housingKeys.forEach(key => {
    if (req.query[key]) {
      if (key === 'price' || key === 'bedrooms' || key === 'bathrooms') {
        querysDB[key] = req.query[key]
      } else {
        querysDB[key] = { $regex: new RegExp(req.query[key], 'i') }
      }
    }
  })

  const addressQuery = {}
  const addressKeys = ['street', 'city', 'state', 'postalCode', 'country']
  addressKeys.forEach(key => {
    if (req.query[key]) {
      addressQuery[key] = { $regex: new RegExp(req.query[key], 'i') }
    }
  })

  try {
    if (Object.keys(addressQuery).length > 0) {
      const addresses = await Address.find(addressQuery)
      const addressIds = addresses.map(address => address._id)
      querysDB.address = { $in: addressIds }
    }

    const housings = await Housing.find(querysDB).populate('address')

    if (!housings || housings.length === 0) {
      return res.status(404).json({ msg: 'Housings not found' })
    }
    res.status(200).json(housings)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const updateHousingRating = async (housingId) => {
  try {
    const reviews = await Review.find({ propertyId: housingId })
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, cur) => acc + cur.rating, 0)
      const averageRating = totalRating / reviews.length
      await Housing.findByIdAndUpdate(housingId, { califications: averageRating })
    } else {
      await Housing.findByIdAndUpdate(housingId, { califications: 0 })
    }
  } catch (error) {
    console.error('Error updating housing rating:', error)
    throw error
  }
}

export {
  createHousing,
  getAllHousing,
  getHousingById,
  updateHousingById,
  deleteHousingById,
  upload,
  getHousingQuery,
  updateHousingRating
}
