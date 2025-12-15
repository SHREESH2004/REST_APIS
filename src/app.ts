import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"
dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/user",userRouter);

export default app;
