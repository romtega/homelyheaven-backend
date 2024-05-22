import express from 'express'
import { createAddress, deleteAddressById, getAddressById, getAllAddress, updateAddressById } from '../controllers/addressConytroller.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isProviderOrAdmin } from '../middlewares/isProviderOrAdmin.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const addressRoutes = express.Router()

addressRoutes.post('/', isAuth, isProviderOrAdmin, createAddress)
addressRoutes.get('/', isAuth, isAdmin, getAllAddress)
addressRoutes.get('/:addressId', isAuth, isAdmin, getAddressById)
addressRoutes.patch('/:addressId', isAuth, isProviderOrAdmin, updateAddressById)
addressRoutes.delete('/:addressId', isAuth, isProviderOrAdmin, deleteAddressById)

export default addressRoutes
