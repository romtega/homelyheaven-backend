import express from 'express'
import { createHousing, deleteHousingrById, getAllHousing, getHousingById, updateHousingById } from '../controllers/housingController.js'

const housingRoutes = express.Router()

housingRoutes.post('/', createHousing)
housingRoutes.get('/', getAllHousing)
housingRoutes.get('/:housingId', getHousingById)
housingRoutes.patch('/:housingId', updateHousingById)
housingRoutes.delete('/:housingId', deleteHousingrById)

export default housingRoutes
