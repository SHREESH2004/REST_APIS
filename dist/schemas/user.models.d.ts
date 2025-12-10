import { Document } from "mongoose";
export interface IUser extends Document {
    updatedAt: any;
    createdAt: any;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
}
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
export default _default;
//# sourceMappingURL=user.models.d.ts.map