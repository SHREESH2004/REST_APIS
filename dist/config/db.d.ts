import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
    log: ("error" | "info" | "query" | "warn")[];
}, "error" | "info" | "query" | "warn", import("@prisma/client/runtime/client").DefaultArgs>;
export declare const connectToDB: () => Promise<void>;
export declare const disconnectDB: () => Promise<void>;
export default prisma;
//# sourceMappingURL=db.d.ts.map