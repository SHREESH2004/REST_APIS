"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getwatchList = exports.addToWatchlist = void 0;
const db_1 = __importDefault(require("../config/db"));
const client_1 = require("@prisma/client");
const addToWatchlist = async (req, res) => {
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
                status: client_1.WatchStatus.PLANNED
            },
            include: {
                movie: true
            }
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
        if (error.code === 'P2003') {
            return res.status(400).json({ message: "Invalid user or movie reference" });
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
            return res.status(401).json({ message: "Unauthorized: User session not found" });
        }
        const watchlist = await db_1.default.watchlist.findMany({
            where: {
                userId: authenticatedUserId
            },
            include: {
                movie: true
            },
            orderBy: {
                createdAt: 'desc'
            }
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
//# sourceMappingURL=watchlist.controller.js.map