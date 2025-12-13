import dotenv from "dotenv";
import app from "./app";
import { connectToDB, disconnectDB } from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectToDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      await disconnectDB();
      server.close(() => process.exit(0));
    });

  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
}

startServer();
