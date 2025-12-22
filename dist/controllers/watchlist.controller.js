"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromWatchlist = exports.updateWatchlist = exports.getwatchList = exports.addToWatchlist = void 0;
const db_1 = __importDefault(require("../config/db"));
const client_1 = require("@prisma/client");
const addToWatchlist = async (req, res) => {
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
        const movie = await db_1.default.movie.findUnique({
            where: { id: numericMovieId },
            select: { id: true }
        });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const newItem = await db_1.default.watchlist.create({
            data: {
                userId: authenticatedUserId,
                movieId: numericMovieId,
                status: status || client_1.WatchStatus.PLANNED,
                rating: rating ? Number(rating) : null
            },
            include: { movie: true }
        });
        return res.status(201).json({
            message: "Movie added to watchlist successfully",
            data: newItem
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "This movie is already in your watchlist" });
        }
        console.error("[WATCHLIST_ADD_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.addToWatchlist = addToWatchlist;
const getwatchList = async (req, res) => {
    try {
        const authenticatedUserId = req.user?.id;
        if (!authenticatedUserId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const watchlist = await db_1.default.watchlist.findMany({
            where: { userId: authenticatedUserId },
            include: { movie: true },
            orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json({
            message: "Watchlist retrieved successfully",
            count: watchlist.length,
            data: watchlist
        });
    }
    catch (err) {
        console.error("[WATCHLIST_GET_ERROR]:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getwatchList = getwatchList;
const updateWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, rating } = req.body;
        const authenticatedUserId = req.user?.id;
        if (!authenticatedUserId)
            return res.status(401).json({ message: "Unauthorized" });
        // Ensure the item exists and belongs to the user
        const entry = await db_1.default.watchlist.findFirst({
            where: {
                id: Number(id),
                userId: authenticatedUserId
            }
        });
        if (!entry) {
            return res.status(404).json({ message: "Watchlist entry not found or unauthorized" });
        }
        const updatedItem = await db_1.default.watchlist.update({
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
    }
    catch (error) {
        console.error("[WATCHLIST_UPDATE_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateWatchlist = updateWatchlist;
const deleteFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const authenticatedUserId = req.user?.id;
        if (!authenticatedUserId)
            return res.status(401).json({ message: "Unauthorized" });
        const entry = await db_1.default.watchlist.findFirst({
            where: {
                id: Number(id),
                userId: authenticatedUserId
            }
        });
        if (!entry) {
            return res.status(404).json({ message: "Watchlist entry not found or unauthorized" });
        }
        await db_1.default.watchlist.delete({
            where: { id: Number(id) }
        });
        return res.status(200).json({ message: "Movie removed from watchlist" });
    }
    catch (error) {
        console.error("[WATCHLIST_DELETE_ERROR]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteFromWatchlist = deleteFromWatchlist;
//# sourceMappingURL=watchlist.controller.js.map