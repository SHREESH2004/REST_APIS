import e from "express";
import {
    addToWatchlist,
    getwatchList,
    updateWatchlist,
    deleteFromWatchlist
} from "../controllers/watchlist.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import { validateRequest, watchlistschema } from "../middleware/watchlist.middleware";

const router = e.Router();

router.post(
    '/addlist',
    authmiddleware,
    validateRequest(watchlistschema),
    addToWatchlist
);

router.get(
    '/getlist',
    authmiddleware,
    getwatchList
);

router.patch(
    '/update/:id',
    authmiddleware,
    validateRequest(watchlistschema.partial()),
    updateWatchlist
);

router.delete(
    '/delete/:id',
    authmiddleware,
    deleteFromWatchlist
);

export default router;