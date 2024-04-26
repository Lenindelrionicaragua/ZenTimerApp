import mongoose from "mongoose";
import { logError, logInfo } from "../util/logging";

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        logInfo("MongoDB connected successfully");
        resolve();
      })
      .catch((error) => {
        logError("Error connecting to MongoDB:", error);
        reject(error);
      });
  });
};

export default connectDB;
