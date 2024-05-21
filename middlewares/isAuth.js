import jwt from 'jwt-simple'
import User from '../models/user.js'

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(404).json({ msg: 'authorization header is required' })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(400).json({ message: 'Authorization header format is Bearer {token}' })
  }

  if (!token) {
    return res.status(400).json({ msg: 'token is required' })
  }

  try {
    const payload = jwt.decode(token, process.env.SECRET)
    const now = Math.floor(Date.now() / 1000)

    if (payload.exp < now) {
      return res.status(403).json({ msg: 'token has expired' })
    }

    const user = await User.findById(payload.sub).select('_id role')
    if (!user) {
      return res.status(403).json({ msg: 'user not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: `Token Error: ${error.message}` })
  }
}

export { isAuth }
