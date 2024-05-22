import Rental from '../models/rental.js'

const createRental = async (req, res) => {
  try {
    const existingRental = await Rental.findOne({
      housing: req.body.housing,
      customer: req.body.customer
    }).populate('housing').populate('provider', ' phone')

    if (existingRental) {
      return res.status(400).json({ message: 'You have already rented this place.', rental: existingRental })
    }

    const rental = await Rental.create(req.body).populate('housing').populate('provider', 'phone')
    res.status(201).json(rental)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ isActive: true }).populate('housing').populate('provider', ' firstName lastName phone')
    res.status(200).json(rentals)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getRentalById = async (req, res) => {
  if (!req.params.rentalId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid rental ID' })
  }

  try {
    const rental = await Rental.findById({ _id: req.params.rentalId, isActive: true })
      .populate('housing').populate('provider', ' firstName lastName phone')
    if (!rental) {
      return res.status(404).json({ msg: 'rental not found' })
    }
    res.status(200).json(rental)
  } catch (error) {
    res.status({ error: error.message })
  }
}

const updateRentalById = async (req, res) => {
  if (!req.params.rentalId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid User ID' })
  }

  try {
    const rental = await Rental.findByIdAndUpdate(req.params.rentalId, req.body, { new: true })
      .populate('housing')
      .populate('provider', 'firstName lastName phone')

    if (!rental) {
      return res.status(404).json({ msg: 'Rental not found' })
    }

    await rental.save()

    res.status(200).json(rental)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteRentalById = async (req, res) => {
  if (!req.params.rentalId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'Invalid rental ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const rental = await Rental.findByIdAndDelete(req.params.rentalId)
      if (!rental) {
        return res.status(404).json({ msg: 'Rental not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const rental = await Rental.findByIdAndUpdate(req.params.rentalId, { isActive: false }, { new: true })

    if (!rental || rental.isActive === false) {
      return res.status(404).json({ msg: 'Rental not found or already inactive' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createRental,
  getAllRentals,
  getRentalById,
  updateRentalById,
  deleteRentalById

}
