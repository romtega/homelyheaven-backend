import express from 'express'
import { deleteUserById, getAllUSer, getUSerById, updateUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/', getAllUSer)
userRoutes.get('/:userId', getUSerById)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUserById)

export default userRoutes
