"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_models_1 = __importDefault(require("../schemas/user.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
const sanitizeUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
const createUser = async ({ name, email, password, }) => {
    const existing = await user_models_1.default.findOne({ email });
    if (existing) {
        return {
            success: false,
            message: "User already exists",
        };
    }
    const passwordHash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const user = await user_models_1.default.create({
        name,
        email,
        passwordHash,
    });
    const token = jsonwebtoken_1.default.sign({
        id: user._id.toString(),
        email: user.email,
    }, JWT_SECRET, { expiresIn: "15m" });
    return {
        success: true,
        message: "User created successfully",
        user: sanitizeUser(user),
        token,
    };
};
exports.createUser = createUser;
//# sourceMappingURL=user.services.js.map