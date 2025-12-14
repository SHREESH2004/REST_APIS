"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectToDB = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});
const connectToDB = async () => {
    try {
        await prisma.$connect();
        console.log("Prisma connected to PostgreSQL");
    }
    catch (err) {
        console.error("Prisma connection failed:", err);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        await pool.end();
        console.log("Prisma and Postgres disconnected");
    }
    catch (err) {
        console.error("Prisma and Postgres disconnect failed:", err);
    }
};
exports.disconnectDB = disconnectDB;
exports.default = prisma;
//# sourceMappingURL=db.js.map