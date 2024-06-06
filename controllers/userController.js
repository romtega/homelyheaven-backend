import User from '../models/user.js'

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    if (!users) {
      return res.status(400).json({ msg: 'users not found' })
    }
    return res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }

  try {
    const user = await User.findById({ _id: req.params.userId, isActive: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status({ error: error.message })
  }
}

const updateUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid User ID' })
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const user = await User.findByIdAndDelete(req.params.userId)
      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: false })

    if (!user || user.isActive === false) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById
}
