import express from 'express'
import { createAddress, deleteAddressById, getAddressById, getAllAddress, updateAddressById } from '../controllers/addressConytroller.js'

const addressRoutes = express.Router()

addressRoutes.post('/', createAddress)
addressRoutes.get('/', getAllAddress)
addressRoutes.get('/:addressId', getAddressById)
addressRoutes.patch('/:addressId', updateAddressById)
addressRoutes.delete('/:addressId', deleteAddressById)

export default addressRoutes
