"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const db_1 = __importDefault(require("../config/db"));
const user_services_1 = require("../services/user.services");
const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await db_1.default.user.findUnique({
        where: { email: email }
    });
    if (!userExists) {
        try {
            const user = await (0, user_services_1.registerservice)({ name, email, password });
            res.status(200).json({
                data: {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    password: user?.password
                },
            });
        }
        catch (error) {
            if (error.message === "EMAIL_ALREADY_EXISTS") {
                return res.status(409).json({
                    message: "User Already Exists",
                });
            }
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    else {
        res.status(400).json({
            message: "User Already Exists"
        });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=user.controller.js.map