import mongoose from "mongoose";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
}
