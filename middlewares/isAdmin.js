const isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ message: 'You do not have the necessary permissions' })
  }
}

export { isAdmin }
