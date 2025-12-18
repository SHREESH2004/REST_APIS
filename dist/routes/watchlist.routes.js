"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const watchlist_controller_1 = require("../controllers/watchlist.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/addlist', auth_middleware_1.authmiddleware, watchlist_controller_1.addToWatchlist);
exports.default = router;
//# sourceMappingURL=watchlist.routes.js.map