import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname, // or destructure and use firstname, lastname separately
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
