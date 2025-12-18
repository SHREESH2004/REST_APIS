"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = void 0;
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authmiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const token = authHeader.split(' ')[1];
        // Verify token and cast to expected payload shape
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Ensure the ID is a number immediately (matches your Prisma Int type)
        const userId = Number(decoded.id);
        if (isNaN(userId)) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        const user = await db_1.default.user.findUnique({
            where: { id: userId },
            select: { id: true }
        });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // Attach the user object to the request
        // Now you can access req.user.id in any controller
        req.user = { id: user.id };
        next();
    }
    catch (error) {
        // Distinguish between expired and invalid tokens if needed
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authmiddleware = authmiddleware;
//# sourceMappingURL=auth.middleware.js.map