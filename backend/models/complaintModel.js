import mongoose from "mongoose";
import validator from "validator";
import Report from "./reportModel.js";

const complaintSchema = new mongoose.Schema({
  subject: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "provide valid email"],
  },
  complaint: {
    type: String,
    required: [true, "Complaint is Required"],
    trim: true,
  },
  creator: {
    type: String,
    required: [true, "Creator is Required"],
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, "createdBy is Required"],
    trim: true,
  },
  creatorRole: {
    type: String,
    required: [true, "creatorRole is Required"],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Status is Required"],
    default: "Pending",
  },
  feedback: {
    type: String,
    trim: true,
  },
  report: [Report.schema],
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
