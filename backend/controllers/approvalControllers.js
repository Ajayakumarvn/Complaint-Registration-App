import User from "../models/userModel.js";
import Approval from "../models/approvalModel.js";

const giveRequest = async (req, res) => {
  try {
    req.body.reqById = req.User.id;
    req.body.reqByName = req.User.name;
    const request = await Approval.create(req.body);
    console.log(request);
    res.status(201).json({
      status: "success",
      request,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const viewRequests = async (req, res) => {
  try {
    const allRequests = await Approval.find({ status: "NA" });

    console.log(allRequests);
    res.status(200).json({
      status: "success",
      allRequests,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    req.body.status = "Approved";
    const approve = await Approval.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    req.body.approval = "Yes";
    req.body.approvalStatus = "Approved";
    const user = await User.findByIdAndUpdate(approve.reqById, req.body, {
      new: true,
    });

    console.log(approve, user);
    res.status(200).json({
      status: "success",
      approve,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    req.body.status = "Rejected";
    const reject = await Approval.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    req.body.approval = "Yes";
    req.body.approvalStatus = "Rejected";
    const user = await User.findByIdAndUpdate(reject.reqById, req.body, {
      new: true,
    });

    console.log(reject, user);
    res.status(200).json({
      status: "success",
      reject,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      error: err.message,
    });
  }
};

const approvalControllers = {
  giveRequest,
  viewRequests,
  approveRequest,
  rejectRequest,
};

export default approvalControllers;
