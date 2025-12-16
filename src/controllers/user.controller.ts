import prisma from "../config/db";
import { registerservice } from "../services/user.services";
import { Request, Response } from "express";

export const registerController = (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = prisma.user.findUnique({
        where: { email: email }
    })
    if (!userExists) {
        res.status(200).json({
            data: {
                name: name,
                email: email,
                password: password
            },
        })
    }
    else {
        res.status(400).json({
            message: "User Already Exists"
        })
    }


}