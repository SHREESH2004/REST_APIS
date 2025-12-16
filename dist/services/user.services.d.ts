interface RegisterInput {
    name: string;
    email: string;
    password: string;
}
export declare const registerservice: ({ name, email, password, }: RegisterInput) => Promise<{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    id: number;
}>;
export {};
//# sourceMappingURL=user.services.d.ts.map