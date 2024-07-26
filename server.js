import express from "express";
import { connect } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3000;

connect();

const api = express();
api.use(express.json());
api.use(cors());
api.use(morgan("tiny"));

api.use("/api/v1", authRoutes);
api.use("/api/v1/users", userRoutes);

api.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
