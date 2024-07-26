import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header is required" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res
      .status(400)
      .json({ msg: "Authorization header format is Bearer {token}" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(payload.id).select("_id role");
    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }

    req.user = user;
    req.role = user.role;

    next();
  } catch (error) {
    return res.status(403).json({ msg: `Token Error: ${error.message}` });
  }
};

export { isAuth };
