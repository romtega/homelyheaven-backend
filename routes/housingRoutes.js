import express from 'express'
import { createHousing, deleteHousingrById, getAllHousing, getHousingById, updateHousingById, upload } from '../controllers/housingController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isProviderOrAdmin } from '../middlewares/isProviderOrAdmin.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const housingRoutes = express.Router()

housingRoutes.post('/', upload.array('imgUrl', 5), isAuth, isProviderOrAdmin, createHousing)
housingRoutes.get('/', isAuth, isAdmin, getAllHousing)
housingRoutes.get('/:housingId', isAuth, isProviderOrAdmin, getHousingById)
housingRoutes.patch('/:housingId', isAuth, isProviderOrAdmin, updateHousingById)
housingRoutes.delete('/:housingId', isAuth, isProviderOrAdmin, deleteHousingrById)

export default housingRoutes
