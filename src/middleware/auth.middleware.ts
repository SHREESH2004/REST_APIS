import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const authmiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};