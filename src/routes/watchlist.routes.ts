import e from "express";
import { addToWatchlist } from "../controllers/watchlist.controller";
import { authmiddleware } from "../middleware/auth.middleware";

const router=e.Router();

router.post('/addlist',authmiddleware,addToWatchlist);

export default router;