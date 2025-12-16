import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export const registerservice = async ({
    name,
    email,
    password,
}: RegisterInput) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: {
                name,
                email,
                password:hashedPassword,
            },
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        throw new Error("USER_CREATION_FAILED");
    }
};
