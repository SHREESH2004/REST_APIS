"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const db_1 = __importDefault(require("../config/db"));
const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await db_1.default.user.findUnique({
        where: { email: email }
    });
    if (!userExists) {
        res.status(200).json({
            data: {
                name: name,
                email: email,
                password: password
            },
        });
    }
    else {
        res.status(400).json({
            message: "User Already Exists"
        });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=user.controller.js.map