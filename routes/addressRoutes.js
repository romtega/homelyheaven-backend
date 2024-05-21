import express from 'express'
import { createAddress, getAddressById, getAllAddress } from '../controllers/addressConytroller.js'

const addressRoutes = express.Router()

addressRoutes.post('/', createAddress)
addressRoutes.get('/', getAllAddress)
addressRoutes.get('/:addressId', getAddressById)

export default addressRoutes
