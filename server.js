import express from 'express'
import authRoutes from './routes/authRoutes.js'
import { connect } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import housingRoutes from './routes/housingRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import morgan from 'morgan'
import cors from 'cors'

const PORT = process.env.PORT || 3000

connect()

const api = express()
api.use(express.json())
api.use(cors())
api.use(morgan('tiny'))

api.use('/api/v1', authRoutes)
api.use('/api/v1/users', userRoutes)
api.use('/api/v1/housing', housingRoutes)
api.use('/api/v1/address', addressRoutes)
api.use('/api/v1/rentals', rentalRoutes)
api.use('/api/v1/reviews', reviewRoutes)

api.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT} 🌱`)
})
