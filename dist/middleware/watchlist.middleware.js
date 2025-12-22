"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.watchlistschema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.watchlistschema = zod_1.z.object({
    movieId: zod_1.z.coerce.number().int().positive({ message: "Invalid Movie ID format" }),
    status: zod_1.z.nativeEnum(client_1.WatchStatus, {
        error: () => ({ message: "Status must be PLANNED, WATCHING, or COMPLETED" })
    }).default(client_1.WatchStatus.PLANNED).optional(),
    rating: zod_1.z.coerce.number().int().min(1, "Minimum rating is 1").max(10, "Max rating is 10").optional(),
    notes: zod_1.z.string().max(500).optional()
});
const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors
            });
        }
        req.body = result.data;
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=watchlist.middleware.js.map