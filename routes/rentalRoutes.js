import express from 'express'
import { createRental, deleteRentalById, getAllRentals, getRentalById, updateRentalById } from '../controllers/rentalController.js'

const rentalRoutes = express.Router()

rentalRoutes.post('/', createRental)
rentalRoutes.get('/', getAllRentals)
rentalRoutes.get('/:rentalId', getRentalById)
rentalRoutes.patch('/:rentalId', updateRentalById)
rentalRoutes.delete('/:rentalId', deleteRentalById)

export default rentalRoutes
