import express from "express";
import informationControllers from "../controllers/informationControllers.js";
import auth from "../controllers/authControllers.js";

const infoRouter = express.Router();

infoRouter.route("/addInfo").post(auth.protect, informationControllers.addInfo);
infoRouter
  .route("/viewInfo")
  .get(auth.protect, informationControllers.viewInfo);
infoRouter
  .route("/deleteInfo/:id")
  .delete(auth.protect, informationControllers.deleteInfo);

export default infoRouter;
