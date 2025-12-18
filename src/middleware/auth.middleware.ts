import { Request, Response, NextFunction } from "express";
import prisma from "../config/db";
import jwt from 'jsonwebtoken';

// Industry Standard: Define the User shape clearly
export interface AuthRequest extends Request {
    user?: {
        id: number;
    };
}

export const authmiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify token and cast to expected payload shape
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string | number };

        // Ensure the ID is a number immediately (matches your Prisma Int type)
        const userId = Number(decoded.id);

        if (isNaN(userId)) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await prisma.user.findUnique({
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
    } catch (error) {
        // Distinguish between expired and invalid tokens if needed
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};