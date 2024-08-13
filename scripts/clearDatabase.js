import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection;

    await db.collection("users").drop();

    console.log("Database cleared.");

    mongoose.disconnect();
  } catch (error) {
    console.error("Error clearing database:", error);
  }
};

clearDatabase();
