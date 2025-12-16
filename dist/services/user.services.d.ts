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
export declare const registerservice: ({ name, email, password, }: RegisterInput) => Promise<{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    id: number;
}>;
export declare const loginservice: ({ email, password, }: LoginInput) => Promise<{
    id: number;
    name: string;
    email: string;
}>;
export declare const updateservice: ({ id, name, email, password, }: UpdateInput) => Promise<{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    id: number;
}>;
export {};
//# sourceMappingURL=user.services.d.ts.map