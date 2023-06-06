import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is Required"],
  },
  detail: {
    type: String,
    trim: true,
    required: [true, "Details are Required"],
  },
  creator: {
    type: String,
    trim: true,
    required: [true, "creator is Required"],
  },
  role: {
    type: String,
    trim: true,
    required: [true, "role is Required"],
  },
});

const Info = mongoose.model("Info", infoSchema);
export default Info;
