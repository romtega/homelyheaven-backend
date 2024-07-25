import express from "express"
import { checkUserName, login, register, upload } from "../controllers/AuthController.js"

const authRoutes = express.Router()

authRoutes.post("/register", upload.single("avatar"), register)
authRoutes.post("/login", login)
authRoutes.get("/check-username/:username", checkUserName)

export default authRoutes
