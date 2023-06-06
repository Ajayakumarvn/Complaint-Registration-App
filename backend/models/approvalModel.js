import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
  reqById: {
    type: String,
    required: [true, "ReqById is Required"],
    trim: true,
  },
  reqByName: {
    type: String,
    required: [true, "ReqByName is Required"],
    trim: true,
  },
  request: {
    type: String,
    required: [true, "Request is Required"],
    trim: true,
  },
  status: {
    type: String,
    default: "NA",
  },
});

const Approval = mongoose.model("Approval", approvalSchema);

export default Approval;
