import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be greater than 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be greater than 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Email must be greater than 3 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// ✅ Instance method: use function keyword so `this` refers to the document
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "1d", // optional: token expiration
  });
};

// ✅ Instance method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Static method to hash passwords (receives password as argument)
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export const User = mongoose.model("User", userSchema);
