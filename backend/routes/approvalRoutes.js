import express from "express";
import approvalControllers from "../controllers/approvalControllers.js";
import auth from "../controllers/authControllers.js";

const approvalRouter = express.Router();

approvalRouter
  .route("/reqAuthority")
  .post(auth.protect, approvalControllers.giveRequest);

approvalRouter
  .route("/viewReq")
  .get(auth.protect, approvalControllers.viewRequests);

approvalRouter
  .route("/approve/:id")
  .patch(auth.protect, approvalControllers.approveRequest);

approvalRouter
  .route("/reject/:id")
  .patch(auth.protect, approvalControllers.rejectRequest);

export default approvalRouter;
