"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
const DB_URL = process.env.CONNECT_URL || "mongodb://localhost:27017/notes";
async function startServer() {
    try {
        await (0, db_1.default)(DB_URL);
        app_1.default.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map