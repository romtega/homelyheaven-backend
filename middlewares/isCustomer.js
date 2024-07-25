const isCustomer = (req, res, next) => {
  if (req.user.role === "customer") {
    next()
  } else {
    return res.status(403).json({ message: "You do not have the necessary permissions" })
  }
}

export { isCustomer }
