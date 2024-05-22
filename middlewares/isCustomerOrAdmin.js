export const isCustomerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'customer' || req.user.role === 'admin')) {
    return next()
  }
  res.status(403).json({ message: 'Forbidden: Access is denied' })
}
