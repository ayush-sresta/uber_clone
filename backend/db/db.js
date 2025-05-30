import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
};
