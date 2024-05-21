import Housing from '../models/housing.js'

export const calculateTotalCost = async function (next) {
  try {
    const housing = await Housing.findById(this.housing)
    if (!housing) {
      throw new Error('Housing not found')
    }

    const oneDay = 24 * 60 * 60 * 1000
    const duration = Math.round(Math.abs((this.endDate - this.startDate) / oneDay))

    if (isNaN(duration) || duration < 0) {
      throw new Error('Invalid date range')
    }

    this.totalCost = duration * housing.price
    next()
  } catch (error) {
    next(error)
  }
}

export const validateDates = function (next) {
  if (this.startDate >= this.endDate) {
    return next(new Error('End date must be after start date'))
  }
  next()
}
