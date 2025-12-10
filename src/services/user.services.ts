import User, { IUser } from "../schemas/user.models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface SanitizedUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserResult {
  success: boolean;
  message: string;
  user?: SanitizedUser;
  token?: string;
}

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const sanitizeUser = (user: IUser): SanitizedUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const createUser = async ({
  name,
  email,
  password,
}: SignupInput):Promise<CreateUserResult> => {
  const existing = await User.findOne({ email });

  if (existing) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const token = jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  return {
    success: true,
    message: "User created successfully",
    user: sanitizeUser(user),
    token,
  };
};
