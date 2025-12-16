import { PrismaClient } from "@prisma/client";
declare const prisma: PrismaClient<{
    log: ("query" | "warn" | "error")[];
}, "query" | "warn" | "error", import("@prisma/client/runtime/library").DefaultArgs>;
export declare const connectToDB: () => Promise<void>;
export declare const disconnectDB: () => Promise<void>;
export default prisma;
//# sourceMappingURL=db.d.ts.map