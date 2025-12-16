"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateservice = exports.loginservice = exports.registerservice = void 0;
const db_1 = __importDefault(require("../config/db"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerservice = async ({ name, email, password, }) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return await db_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        throw new Error("USER_CREATION_FAILED");
    }
};
exports.registerservice = registerservice;
const loginservice = async ({ email, password, }) => {
    const user = await db_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }
    const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};
exports.loginservice = loginservice;
const updateservice = async ({ id, name, email, password, }) => {
    try {
        let updatedData = {};
        if (name)
            updatedData.name = name;
        if (email)
            updatedData.email = email;
        if (password) {
            updatedData.password = await bcrypt_1.default.hash(password, 10);
        }
        return await db_1.default.user.update({
            where: { id },
            data: updatedData,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        throw new Error("USER_UPDATE_FAILED");
    }
};
exports.updateservice = updateservice;
//# sourceMappingURL=user.services.js.map