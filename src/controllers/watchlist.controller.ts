import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth.middleware";
import { WatchStatus } from "@prisma/client";

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const { movieId, status, rating } = req.body;
        const authenticatedUserId = req.user?.id;

        if (!authenticatedUserId) {
            return res.status(401).json({ message: "Unauthorized: User session not found" });
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
                status: status || WatchStatus.PLANNED,
                rating: rating ? Number(rating) : null
            },
            include: { movie: true }
        });

        return res.status(201).json({
            message: "Movie added to watchlist successfully",
            data: newItem
        });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "This movie is already in your watchlist" });
        }
        console.error("[WATCHLIST_ADD_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getwatchList = async (req: AuthRequest, res: Response) => {
    try {
        const authenticatedUserId = req.user?.id;

        if (!authenticatedUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const watchlist = await prisma.watchlist.findMany({
            where: { userId: authenticatedUserId },
            include: { movie: true },
            orderBy: { createdAt: 'desc' }
        });
        

        return res.status(200).json({
            message: "Watchlist retrieved successfully",
            count: watchlist.length,
            data: watchlist
        });
    } catch (err) {
        console.error("[WATCHLIST_GET_ERROR]:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status, rating } = req.body;
        const authenticatedUserId = req.user?.id;

        if (!authenticatedUserId) return res.status(401).json({ message: "Unauthorized" });

        // Ensure the item exists and belongs to the user
        const entry = await prisma.watchlist.findFirst({
            where: {
                id: Number(id),
                userId: authenticatedUserId
            }
        });

        if (!entry) {
            return res.status(404).json({ message: "Watchlist entry not found or unauthorized" });
        }

        const updatedItem = await prisma.watchlist.update({
            where: { id: Number(id) },
            data: {
                status: status,
                rating: rating !== undefined ? Number(rating) : undefined
            },
            include: { movie: true }
        });

        return res.status(200).json({
            message: "Watchlist updated successfully",
            data: updatedItem
        });
    } catch (error) {
        console.error("[WATCHLIST_UPDATE_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteFromWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const authenticatedUserId = req.user?.id;

        if (!authenticatedUserId) return res.status(401).json({ message: "Unauthorized" });
        const entry = await prisma.watchlist.findFirst({
            where: {
                id: Number(id),
                userId: authenticatedUserId
            }
        });

        if (!entry) {
            return res.status(404).json({ message: "Watchlist entry not found or unauthorized" });
        }

        await prisma.watchlist.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json({ message: "Movie removed from watchlist" });
    } catch (error) {
        console.error("[WATCHLIST_DELETE_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};