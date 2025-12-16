import prisma from "../config/db";
type ModelName = keyof typeof prisma;
export declare const createRecord: (model: ModelName, data: any) => Promise<any>;
export declare const findOneRecord: (model: ModelName, where: any) => Promise<any>;
export declare const findManyRecords: (model: ModelName, where?: any) => Promise<any>;
export declare const deleteRecord: (model: ModelName, where: any) => Promise<any>;
export {};
//# sourceMappingURL=main.serivices.d.ts.map