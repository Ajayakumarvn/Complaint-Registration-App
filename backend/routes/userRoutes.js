import express from "express";
import auth from "../controllers/authControllers.js";
import userControllers from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.route("/signup").post(auth.signup);
userRouter.route("/login").post(auth.login);

userRouter.route("/addVO").post(auth.signup);
userRouter.route("/addSub").post(auth.signup);

userRouter
  .route("/viewAuthorities")
  .get(auth.protect, userControllers.viewAuthorities);

userRouter.route("/viewUsers").get(auth.protect, userControllers.viewUsers);

userRouter
  .route("/delete/:id")
  .delete(auth.protect, userControllers.deleteAuthorities);

export default userRouter;
