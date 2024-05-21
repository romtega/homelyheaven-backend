import express from 'express'
import { createRental } from '../controllers/rentalController.js'

const rentalRoutes = express.Router()

rentalRoutes.post('/', createRental)

export default rentalRoutes
