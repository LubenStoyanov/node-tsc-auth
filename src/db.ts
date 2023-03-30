import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    const options: ConnectOptions = {
      // only include the properties defined in ConnectOptions
    };

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGO_URI, { ...options, ...mongooseOptions });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
