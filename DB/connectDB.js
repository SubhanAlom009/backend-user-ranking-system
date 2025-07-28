import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      `${process.env.MONGO_URI}/user_rank_system`
    );
    console.log("MongoDB connected successfully:", connect.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};
