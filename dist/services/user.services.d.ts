interface SignupInput {
    name: string;
    email: string;
    password: string;
}
interface SanitizedUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
interface CreateUserResult {
    success: boolean;
    message: string;
    user?: SanitizedUser;
    token?: string;
}
export declare const createUser: ({ name, email, password, }: SignupInput) => Promise<CreateUserResult>;
export {};
//# sourceMappingURL=user.services.d.ts.map