import express from "express";
import complaintRouter from "./routes/complaintRoutes.js";
import approvalRouter from "./routes/approvalRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());

app.use("/complaints", complaintRouter);
app.use("/approvals", approvalRouter);
app.use("/info", infoRouter);
app.use("/users", userRouter);

export default app;
