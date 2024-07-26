const isHost = (req, res, next) => {
  if (req.user.role === "host") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You do not have the necessary permissions" });
  }
};

export { isHost };
