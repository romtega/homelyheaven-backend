import express from 'express'
import { createRental, deleteRentalById, getAllRentals, getRentalById, updateRentalById } from '../controllers/rentalController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isCustomerOrAdmin } from '../middlewares/isCustomerOrAdmin.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const rentalRoutes = express.Router()

rentalRoutes.post('/', isAuth, isCustomerOrAdmin, createRental)
rentalRoutes.get('/', isAuth, isAdmin, getAllRentals)
rentalRoutes.get('/:rentalId', isAuth, isCustomerOrAdmin, getRentalById)
rentalRoutes.patch('/:rentalId', isAuth, isAdmin, updateRentalById)
rentalRoutes.delete('/:rentalId', isAuth, isAdmin, deleteRentalById)

export default rentalRoutes
