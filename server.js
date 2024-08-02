import express from "express";
import { connect } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 3000;

connect();

const api = express();
api.use(express.json());
api.use(cors());
api.use(morgan("tiny"));

api.get("/test-endpoint", (req, res) => {
  res.json({ message: "Conexion exitosa con el backend" });
});

api.use("/api/v1", authRoutes);
api.use("/api/v1/users", userRoutes);
api.use("/api/v1/properties", propertyRoutes);
api.use("/api/v1/properties", reviewRoutes);

api.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});
