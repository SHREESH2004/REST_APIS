"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/register", user_controller_1.registerController);
router.post("/login", user_controller_1.loginController);
router.put("/update/:id", user_controller_1.updateController);
router.post("/logout", user_controller_1.logoutController);
exports.default = router;
//# sourceMappingURL=user.routes.js.map