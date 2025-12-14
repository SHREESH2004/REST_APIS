import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected to PostgreSQL");
  } catch (err) {
    console.error("Prisma connection failed:", err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    await pool.end(); 
    console.log("Prisma and Postgres disconnected");
  } catch (err) {
    console.error("Prisma and Postgres disconnect failed:", err);
  }
};

export default prisma;
