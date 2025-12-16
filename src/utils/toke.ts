import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: TokenPayload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
