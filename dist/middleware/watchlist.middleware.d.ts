import { Request, Response, NextFunction } from "express";
import { z, ZodObject } from "zod";
export declare const watchlistschema: z.ZodObject<{
    movieId: z.ZodCoercedNumber<unknown>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        PLANNED: "PLANNED";
        WATCHING: "WATCHING";
        COMPLETED: "COMPLETED";
        DROPPED: "DROPPED";
    }>>>;
    rating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const validateRequest: (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=watchlist.middleware.d.ts.map