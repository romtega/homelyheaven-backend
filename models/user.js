import mongoose from 'mongoose'

const roleEnum = ['provider', 'customer', 'admin']

const userSchema = new mongoose.Schema({
  dni: {
    type: String,
    unique: true,
    default: function () {
      return Math.floor(Math.random() * 1000000)
    }
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true, default: 'customer', enum: roleEnum },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value)
      },
      message: props => '{props.value} no es un numero de teléfono valido. debe tener 10 dígitos'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email)
      },
      message: props => `${props.value} no es un correo electronico valido`
    }
  },
  password: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  isActive: { type: Boolean, default: true }

}, { timestamps: true })

export default mongoose.model('User', userSchema)
