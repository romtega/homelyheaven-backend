const isGuest = (req, res, next) => {
  if (req.user.role === "guest") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You do not have the necessary permissions" });
  }
};

export { isGuest };
