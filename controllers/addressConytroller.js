import Address from '../models/address.js'

const createAddress = async (req, res) => {
  try {
    const { street, city, zipCode } = req.body

    const existingAddress = await Address.findOne({ street, city, zipCode })

    if (existingAddress) {
      res.status(200).json(existingAddress)
    } else {
      const address = await Address.create(req.body)
      res.status(201).json(address)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllAddress = async (rea, res) => {
  try {
    const addresss = await Address.find({ isActive: true })
    if (!addresss) {
      return res.status(404).json({ msg: 'address no found' })
    }
    res.status(200).json(addresss)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getAddressById = async (req, res) => {
  if (!req.params.addressId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid address ID' })
  }

  try {
    const address = await Address.findOne({ _id: req.params.addressId, isActive: true })

    if (!address) {
      return res.status(404).json({ msg: 'Address not found' })
    }

    res.status(200).json(address)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateAddressById = async (req, res) => {
  if (!req.params.addressId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid address ID' })
  }

  try {
    const address = await Address.findByIdAndUpdate(req.params.addressId, req.body, { new: true })
    if (!address) {
      return res.status(404).json({ msg: 'address not found' })
    }
    res.status(200).json(address)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteAddressById = async (req, res) => {
  if (!req.params.addressId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid address ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const address = await Address.findByIdAndDelete(req.params.addressId)
      if (!address) {
        return res.status(404).json({ msg: 'Address not found' })
      }
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const address = await Address.findByIdAndUpdate(req.params.addressId, { isActive: false }, { new: true })

    if (!address || address.isActive === false) {
      return res.status(404).json({ msg: 'Address not found or already inactive' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createAddress,
  getAllAddress,
  getAddressById,
  updateAddressById,
  deleteAddressById
}
