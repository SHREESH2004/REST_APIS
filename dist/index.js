"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        await (0, db_1.connectToDB)();
        const server = app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
        process.on("SIGINT", async () => {
            console.log("Shutting down server...");
            await (0, db_1.disconnectDB)();
            server.close(() => process.exit(0));
        });
    }
    catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map