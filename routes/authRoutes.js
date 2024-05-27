import express from 'express'
import { checkUsarName, login, register } from '../controllers/AuthController.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.get('/check-username/:username', checkUsarName)

export default authRoutes
