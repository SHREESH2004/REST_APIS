"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.updateController = exports.loginController = exports.registerController = void 0;
const user_services_1 = require("../services/user.services");
const toke_1 = require("../utils/toke");
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const user = await (0, user_services_1.registerservice)({ name, email, password });
        return res.status(201).json({
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const user = await (0, user_services_1.loginservice)({ email, password });
        const token = (0, toke_1.generateToken)({
            id: user.id,
            email: user.email
        }, res);
        return res.status(200).json({
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.loginController = loginController;
const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }
        const user = await (0, user_services_1.updateservice)({
            id: Number(id),
            name,
            email,
            password,
        });
        return res.status(200).json({
            message: "User updated successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "Email already in use",
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.updateController = updateController;
const logoutController = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0)
        });
        return res.status(200).json({
            message: "Logged out successfully",
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.logoutController = logoutController;
//# sourceMappingURL=user.controller.js.map