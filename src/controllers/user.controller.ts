import { registerservice } from "../services/user.services";
import { Request, Response } from "express";

export const registerController = (req: Request, res: Response) => {
    const {name,email,password} = req.body;
    res.status(200).json({
        data: {
            name:name,
            email:email,
            password:password
        },
    })


}