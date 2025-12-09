"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DB_URL_CONNECT = process.env.CONNECT_URL ?? "mongodb://localhost:27017/notes";
app.get('/', (req, res) => {
    res.json({
        message: 'Express + TypeScript server running!',
        port: PORT,
        env: process.env.NODE_ENV
    });
});
const startServer = async () => {
    try {
        await (0, db_1.default)(DB_URL_CONNECT);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map