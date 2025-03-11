import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const generateToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({ name, email, password });
  const token = generateToken(newUser);

  res.status(201).json(new ApiResponse(201, { token, user: { name: newUser.name, email: newUser.email } }, "User registered successfully"));
});


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user);
  res.status(200).json(new ApiResponse(200, { token, user: { name: user.name, email: user.email,_id:user._id } }, "Login successful"));
});
