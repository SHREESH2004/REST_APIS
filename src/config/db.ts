import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "warn", "error"],
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
    console.log("Prisma disconnected");
  } catch (err) {
    console.error("Prisma disconnect failed:", err);
  }
};

export default prisma;
