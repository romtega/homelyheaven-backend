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

export {
  createRental
}
