import Housing from '../models/housing.js'
import Address from '../models/address.js'

const createHousing = async (req, res) => {
  try {
    const housingData = req.body
    if (!housingData) {
      return res.status(400).json({ msg: 'Housing data is missing' })
    }

    if (!housingData.address) {
      return res.status(400).json({ msg: 'Address data is missing' })
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

    res.status(201).json(newHousing)
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

const deleteHousingrById = async (req, res) => {
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

export {
  createHousing,
  getAllHousing,
  getHousingById,
  updateHousingById,
  deleteHousingrById
}
