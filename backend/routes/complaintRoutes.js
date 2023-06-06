import express from "express";
import complaintControllers from "../controllers/complaintControllers.js";
import auth from "../controllers/authControllers.js";

const complaintRouter = express.Router();

complaintRouter
  .route("/addComplaint")
  .post(auth.protect, complaintControllers.regComplaint);

complaintRouter
  .route("/viewAll")
  .get(auth.protect, complaintControllers.viewAllComplaints);

complaintRouter
  .route("/viewPending")
  .get(auth.protect, complaintControllers.viewAllComplaintsPending);

complaintRouter
  .route("/viewVerifiedbyVO")
  .get(auth.protect, complaintControllers.viewAllComplaintsVO);

complaintRouter
  .route("/viewVerifiedbySC")
  .get(auth.protect, complaintControllers.viewAllComplaintsSC);

complaintRouter
  .route("/viewOne/:id")
  .get(auth.protect, complaintControllers.viewOneComplaint);

complaintRouter
  .route("/viewMy")
  .get(auth.protect, complaintControllers.viewMyComplaints);

complaintRouter
  .route("/addReport/:id")
  .patch(auth.protect, complaintControllers.addReportToComplaint);

complaintRouter
  .route("/rejectComplaint/:id")
  .patch(auth.protect, complaintControllers.rejectComplaint);

complaintRouter;
//   .route("/verifyByVillage/:id")
//   .patch(auth.protect, complaintControllers.verificationByVillage);

// complaintRouter
//   .route("/verifyBySub/:id")
//   .patch(auth.protect, complaintControllers.verificationBySub);

// complaintRouter
//   .route("/verifyByCollector/:id")
//   .patch(auth.protect, complaintControllers.verificationByCollector);

// complaintRouter
//   .route("/verifyByVillage/:id")
//   .patch(auth.protect, complaintControllers.verificationByVillage);

// complaintRouter
//   .route("/verifyBySub/:id")
//   .patch(auth.protect, complaintControllers.verificationBySub);

// complaintRouter
//   .route("/verifyByCollector/:id")
//   .patch(auth.protect, complaintControllers.verificationByCollector);

complaintRouter
  .route("/feedback/:id")
  .patch(auth.protect, complaintControllers.subFeedback);

export default complaintRouter;
