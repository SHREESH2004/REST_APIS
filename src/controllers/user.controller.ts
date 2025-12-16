import prisma from "../config/db";
import { registerservice } from "../services/user.services";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })
    if (!userExists) {
        try {
            const user = await registerservice({ name, email, password });
            res.status(200).json({
                data: {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    password: user?.password
                },
            })

        } catch (error: any) {
            if (error.message === "EMAIL_ALREADY_EXISTS") {
                return res.status(409).json({
                    message: "User Already Exists",
                });
            }

            return res.status(500).json({
                message: "Internal Server Error",
            });

        }
    }
    else {
        res.status(400).json({
            message: "User Already Exists"
        })
    }


}
