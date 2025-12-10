import express, { Application } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
