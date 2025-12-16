"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectToDB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: ["query", "warn", "error"],
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
        console.log("Prisma disconnected");
    }
    catch (err) {
        console.error("Prisma disconnect failed:", err);
    }
};
exports.disconnectDB = disconnectDB;
exports.default = prisma;
//# sourceMappingURL=db.js.map