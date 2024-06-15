import mongoose from "mongoose";
import { config } from "./env-config.js";

export const connectDB = async () => {
  try {
    // REGISTER EVENT IF DB CONNECTED SUCCESSFULLY
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully !!");
    });

    // REGISTER EVENT IF DB CONNECTED BUT WITH ERROR
    mongoose.connection.on("error", (err) => {
      console.log("Error connection with database.", err);
    });

    // CONNECT WITH DATABASE
    await mongoose.connect(config.mongodb_uri);
  } catch (error) {
    console.log("Failed to connect with database", error);
    // STOP PROCESS WITH ERROR CODE 1
    process.exit(1);
  }
};
