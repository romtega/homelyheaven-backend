import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Usando jsonwebtoken en lugar de jwt-simple
import multer from "multer";
import { tmpdir } from "os";
import cloudinary from "../config/cloudinaryConfig.js";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: tmpdir(),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const register = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      role,
      username,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !phoneNumber ||
      !role ||
      !username
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let imageUrl = "";
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ msg: "Image upload failed" });
      }
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      username,
      role,
      avatar: imageUrl,
    });

    newUser.password = undefined;
    return res.status(201).json({ msg: "User created successfully", newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: error.message });
    }
    return res
      .status(500)
      .json({ msg: `Error creating user: ${error.message}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 7),
    };

    const token = jwt.sign(payload, process.env.SECRET);

    return res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ msg: `Error logging in: ${error.message}` });
  }
};

const checkUserName = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return res.status(200).json({ isAvailable: !user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { register, login, checkUserName, upload };
