import { Request, Response } from "express";
import { createUser } from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Incomplete credentials",
    });
    }

  const result = await createUser({ name, email, password });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  }

  return res.status(201).json({
    success: true,
    message: result.message,
    user: result.user,
    token: result.token,
  });
};
