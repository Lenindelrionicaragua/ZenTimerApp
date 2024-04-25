import connectDB from "../../db/connectDB";
import mongoose from "mongoose";
import { logError, logInfo } from "../../util/logging";

jest.mock("mongoose");
jest.mock("../../util/logging");

describe("connectDB function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("connect to MongoDB successfully and log the success message", async () => {
    mongoose.connect.mockResolvedValueOnce();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    expect(logInfo).toHaveBeenCalledWith("MongoDB connected successfully");
    expect(logError).not.toHaveBeenCalled();
  });

  test("log an error message if the connection to MongoDB fails", async () => {
    mongoose.connect.mockRejectedValueOnce();
  
    await connectDB();
  
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    expect(logError).toHaveBeenCalled();

    expect(logInfo).not.toHaveBeenCalled();
  });
  
});
