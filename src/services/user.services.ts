import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

interface UpdateInput {
    id: number;
    name?: string;
    email?: string;
    password?: string;
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
                password: hashedPassword,
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


export const loginservice = async ({
    email,
    password,
}: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};


export const updateservice = async ({
    id,
    name,
    email,
    password,
}: UpdateInput) => {
    try {
        let updatedData: any = {};

        if (name) updatedData.name = name;
        if (email) updatedData.email = email;

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        return await prisma.user.update({
            where: { id },
            data: updatedData,
        });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }

        throw new Error("USER_UPDATE_FAILED");
    }
};
