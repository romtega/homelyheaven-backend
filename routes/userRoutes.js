import express from 'express'
import { deleteUserById, getAllUser, getUserById, updateUserById, getUserProfileByEmail } from '../controllers/userController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const userRoutes = express.Router()

userRoutes.get('/profile', isAuth, getUserProfileByEmail)
userRoutes.get('/', isAuth, isAdmin, getAllUser)
userRoutes.get('/:userId', isAuth, isAdmin, getUserById)
userRoutes.patch('/:userId', isAuth, isAdmin, updateUserById)
userRoutes.delete('/:userId', isAuth, isAdmin, deleteUserById)

export default userRoutes
