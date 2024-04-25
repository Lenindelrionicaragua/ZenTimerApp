import mongoose from "mongoose";
import { logError, logInfo } from "../util/logging";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logInfo("MongoDB connected successfully");
    })
    .catch((error) => {
      logError("Error connecting to MongoDB:", error);
    });
};

export default connectDB;
