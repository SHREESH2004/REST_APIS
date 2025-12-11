import dotenv from "dotenv";
import express, { Application } from "express";

import app from "./app";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const DB_URL = process.env.CONNECT_URL || "mongodb://localhost:27017/notes";

async function startServer(): Promise<void> {
  try {

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
