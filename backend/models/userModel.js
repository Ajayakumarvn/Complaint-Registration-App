import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "provide valid email"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [3, "password must have a min of 3 characters"],
    select: false,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "possible values are Male,Female & Other",
    },
  },

  role: {
    type: String,
    required: [true, "Role is Required"],
    enum: {
      values: ["Citizen", "Village Officer", "Sub Collector", "Collector"],
      message:
        "possible values are Citizen,Village Officer,Sub Collector & Collector",
    },
    default: "Citizen",
  },
  eid: {
    type: String,
    required: [true, "E-ID is required"],
    default: "nil",
  },
  // complaints: [String],
  approval: { type: String, default: "No" },
  approvalStatus: { type: String, default: "NA" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
