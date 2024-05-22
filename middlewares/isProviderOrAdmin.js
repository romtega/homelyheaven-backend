export const isProviderOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'provider' || req.user.role === 'admin')) {
    return next()
  }
  res.status(403).json({ message: 'Forbidden: Access is denied' })
}
