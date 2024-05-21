const isProvider = (req, res, next) => {
  if (req.user.role === 'provider') {
    next()
  } else {
    return res.status(403).json({ message: 'You do not have the necessary permissions' })
  }
}

export { isProvider }
