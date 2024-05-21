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
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const address = await Address.findById({ _id: req.params.addressId, isActive: true }).populate('housing')
    if (!address) {
      return res.status(404).json({ msg: 'address not found' })
    }
    res.status(200).json(address)
  } catch (error) {
    res.status({ error: error.message })
  }
}

export {
  createAddress,
  getAllAddress,
  getAddressById
}
