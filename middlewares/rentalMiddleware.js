import Housing from '../models/housing.js'
import mongoose from 'mongoose'

export const calculateTotalCost = async function (next) {
  try {
    let rental

    if (this instanceof mongoose.Query) {
      rental = await this.model.findOne(this.getQuery())
      const update = this.getUpdate()
      if (update.startDate) rental.startDate = update.startDate
      if (update.endDate) rental.endDate = update.endDate
    } else {
      rental = this
    }

    const housing = await Housing.findById(rental.housing)
    if (!housing) {
      throw new Error('Housing not found')
    }

    const oneDay = 24 * 60 * 60 * 1000
    const duration = Math.round(Math.abs((rental.endDate - rental.startDate) / oneDay))

    if (isNaN(duration) || duration < 0) {
      throw new Error('Invalid date range')
    }

    rental.totalCost = duration * housing.price
    next()
  } catch (error) {
    next(error)
  }
}

export const validateDates = function (next) {
  const rental = this instanceof mongoose.Query ? this.getUpdate() : this

  if (rental.startDate >= rental.endDate) {
    return next(new Error('End date must be after start date'))
  }
  next()
}
