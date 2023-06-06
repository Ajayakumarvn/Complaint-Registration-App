import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  // titleVillage: {
  //   type: String,
  //   trim: true,
  // },
  createdByVillage: { type: String, trim: true },
  creatorVillage: { type: String, trim: true },
  descriptionVillage: {
    type: String,
  },
  // titleSub: {
  //   type: String,
  // },
  createdBySub: { type: String, trim: true },
  creatorSub: { type: String, trim: true },
  descriptionSub: {
    type: String,
  },
  // titleCollector: {
  //   type: String,
  // },
  createdByCollector: { type: String, trim: true },
  creatorCollector: { type: String, trim: true },
  descriptionCollector: {
    type: String,
  },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
