import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import multer from "multer";
import { tmpdir } from "os";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({
  destination: tmpdir(),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "email and password are required" });
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedPassword;

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newUSer = await User.create({
      ...req.body,
      avatar: imageUrl
    });

    newUSer.password = undefined;

    return res.status(201).json({ msg: "User created succesfully", newUSer });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: `error creating user: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: "email or password are required" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ msg: "user or password error" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "user or password error" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7)
    };

    const token = jwt.encode(payload, process.env.SECRET);

    return res.status(200).json({ msg: "login success", token });
  } catch (error) {}
};

const checkUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ isAvailable: false });
    } else {
      return res.status(200).json({ isAvailable: true });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { register, login, checkUserName, upload };
