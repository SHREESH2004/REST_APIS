import { Response } from "express";
interface TokenPayload {
    id: number;
    email: string;
}
export declare const generateToken: (payload: TokenPayload, res: Response) => string;
export {};
//# sourceMappingURL=toke.d.ts.map