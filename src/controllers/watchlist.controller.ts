import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";
import { WatchStatus } from "@prisma/client";

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        // 1. Extract data safely
        // Industry Standard: Never trust userId from req.body; use req.user from middleware
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

        // 2. Check if Movie exists (Prevents P2003 Foreign Key error)
        const movie = await prisma.movie.findUnique({
            where: { id: numericMovieId },
            select: { id: true } // Only select ID to optimize performance
        });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // 3. Create the Watchlist entry
        // We use req.user.id to ensure the user is adding to THEIR OWN list
        const newItem = await prisma.watchlist.create({
            data: {
                userId: authenticatedUserId, 
                movieId: numericMovieId,
                status: WatchStatus.PLANNED // Use the Enum from Prisma
            },
            include: {
                movie: true // Return movie details so frontend can update UI immediately
            }
        });

        return res.status(201).json({
            message: "Movie added to watchlist successfully",
            data: newItem
        });

    } catch (error: any) {
        // P2002: Unique constraint failed (user already has this movie in list)
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "This movie is already in your watchlist" });
        }

        // P2003: Foreign key constraint failed (e.g., User ID in token doesn't exist in DB)
        if (error.code === 'P2003') {
            return res.status(400).json({ message: "Invalid user or movie reference" });
        }

        console.error("[WATCHLIST_ADD_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};