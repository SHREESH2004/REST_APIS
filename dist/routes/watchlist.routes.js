"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const watchlist_controller_1 = require("../controllers/watchlist.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const watchlist_middleware_1 = require("../middleware/watchlist.middleware");
const router = express_1.default.Router();
router.post('/addlist', auth_middleware_1.authmiddleware, (0, watchlist_middleware_1.validateRequest)(watchlist_middleware_1.watchlistschema), watchlist_controller_1.addToWatchlist);
router.get('/getlist', auth_middleware_1.authmiddleware, watchlist_controller_1.getwatchList);
router.patch('/update/:id', auth_middleware_1.authmiddleware, (0, watchlist_middleware_1.validateRequest)(watchlist_middleware_1.watchlistschema.partial()), watchlist_controller_1.updateWatchlist);
router.delete('/delete/:id', auth_middleware_1.authmiddleware, watchlist_controller_1.deleteFromWatchlist);
exports.default = router;
//# sourceMappingURL=watchlist.routes.js.map