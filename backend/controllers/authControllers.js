import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      gender: req.body.gender,
      role: req.body.role,
      eid: req.body.eid,
    });

    const token = signToken(newUser._id);
    const name = newUser.name;
    const role = newUser.role;

    res.status(201).json({
      status: "Created",
      token,
      name,
      role,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    const correct = user.correctPassword(password, user.password);

    if (!user || !correct) {
      throw new Error("Incorrect Email or Password");
    }

    const token = signToken(user._id);
    const name = user.name;
    const role = user.role;
    res.status(200).json({
      status: "success",
      token,
      name,
      role,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const protect = async (req, res, next) => {
  try {
    // 1.getting token and check if its there

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in!");
    }

    // 2.verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error(
        "The user belonging to this token does no longer exists."
      );
    }

    req.User = currentUser;

    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const auth = {
  signup,
  login,
  protect,
};

export default auth;
