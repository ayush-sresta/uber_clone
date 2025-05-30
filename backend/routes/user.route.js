import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least than 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  registerUser
);

export default router