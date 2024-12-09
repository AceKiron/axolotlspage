import UserModel, { UserDocument } from "../models/user.model";
import AppError from "../utils/appError";
import { CONFLICT } from "../constants/http";

type RegisterUserPayload = {
    email: string;
    password: string;
}
type RegisterUserResult = {
    success: true;
    document: UserDocument;
} | {
    success: false;
    err: AppError;
}
export const registerUser = async (payload: RegisterUserPayload): Promise<RegisterUserResult> => {
    if (await UserModel.exists({
        email: payload.email
    })) {
        return {
            success: false,
            err: new AppError(CONFLICT, `User with email '${payload.email}' already exists.`)
        };
    }

    return {
        success: true,
        document: await new UserModel({
            email: payload.email,
            passwordSalt: "ABC",
            passwordHash: payload.password + "D"
        }).save()
    };
}