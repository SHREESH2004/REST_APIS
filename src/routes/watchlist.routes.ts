import e from "express";
import { addToWatchlist, getwatchList } from "../controllers/watchlist.controller";
import { authmiddleware } from "../middleware/auth.middleware";

const router=e.Router();

router.post('/addlist',authmiddleware,addToWatchlist);
router.get('/getlist',authmiddleware,getwatchList)

export default router;
