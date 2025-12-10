"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const user_services_1 = require("../services/user.services");
const createUserController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Incomplete credentials",
        });
    }
    const result = await (0, user_services_1.createUser)({ name, email, password });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.message,
        });
    }
    return res.status(201).json({
        success: true,
        message: result.message,
        user: result.user,
        token: result.token,
    });
};
exports.createUserController = createUserController;
//# sourceMappingURL=user.controller.js.map