import { Request, Response } from "express";
import {
    registerservice,
    loginservice,
    updateservice,
} from "../services/user.services";
import { generateToken } from "../utils/toke";


export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await registerservice({ name, email, password });

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};




export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await loginservice({ email, password });

        const token = generateToken({
            id: user.id,
            email: user.email

        }, res);

        return res.status(200).json({
            message: "Login successful",
            user,
        });

    } catch (error: any) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};




export const updateController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        const user = await updateservice({
            id: Number(id),
            name,
            email,
            password,
        });

        return res.status(200).json({
            message: "User updated successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                message: "Email already in use",
            });
        }

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const logoutController=async(req:Request,res:Response)=>{
    try{
        res.cookie("jwt","",{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({
            message:"Logged out succesfully",
        })
    }
    catch(err){
        console.log(err);
    }
}
