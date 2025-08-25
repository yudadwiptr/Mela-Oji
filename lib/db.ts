import mongoose from "mongoose";

// Cache the database connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error("MONGODB_URI environment variable is missing");
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    isConnected = true;
    console.log("Connected to MongoDB database successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB database:", error);
    throw new Error(`Database connection error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export default connectToDatabase;
