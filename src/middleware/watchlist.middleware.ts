import { Request, Response, NextFunction } from "express";
import { z, ZodObject } from "zod";
import { WatchStatus } from "@prisma/client";

export const watchlistschema = z.object({
    movieId: z.coerce.number().int().positive({ message: "Invalid Movie ID format" }),
    status: z.nativeEnum(WatchStatus, {
        error: () => ({ message: "Status must be PLANNED, WATCHING, or COMPLETED" })
    }).default(WatchStatus.PLANNED).optional(),
    rating: z.coerce.number().int().min(1, "Minimum rating is 1").max(10, "Max rating is 10").optional(),
    notes: z.string().max(500).optional()
});

export const validateRequest = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
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