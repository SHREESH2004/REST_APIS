import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  updatedAt: any;
  createdAt: any;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
