import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
export declare const addToWatchlist: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getwatchList: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateWatchlist: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteFromWatchlist: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=watchlist.controller.d.ts.map