import jwt from "jsonwebtoken";
import { Response } from "express";

interface TokenPayload {
  id: number;
  email: string;
}

export const generateToken = (
  payload: TokenPayload,
  res: Response
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,          
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, 
  });

  return token;
};
