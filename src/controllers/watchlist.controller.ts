import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";
import { WatchStatus } from "@prisma/client";

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const { movieId } = req.body;
        const authenticatedUserId = req.user?.id;

        if (!authenticatedUserId) {
            return res.status(401).json({ message: "Unauthorized: User session not found" });
        }

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        const numericMovieId = Number(movieId);
        if (isNaN(numericMovieId)) {
            return res.status(400).json({ message: "Invalid Movie ID format" });
        }
        const movie = await prisma.movie.findUnique({
            where: { id: numericMovieId },
            select: { id: true } 
        });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const newItem = await prisma.watchlist.create({
            data: {
                userId: authenticatedUserId, 
                movieId: numericMovieId,
                status: WatchStatus.PLANNED 
            },
            include: {
                movie: true 
            }
        });

        return res.status(201).json({
            message: "Movie added to watchlist successfully",
            data: newItem
        });

    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "This movie is already in your watchlist" });
        }
        if (error.code === 'P2003') {
            return res.status(400).json({ message: "Invalid user or movie reference" });
        }

        console.error("[WATCHLIST_ADD_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};