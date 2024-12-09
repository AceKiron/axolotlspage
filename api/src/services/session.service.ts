import AppResult from "../constants/appResult";
import SessionModel from "../models/session.model";
import { UserDocument } from "../models/user.model";
import AppError from "../utils/appError";
import { signAccess, signRefresh } from "../utils/jwt";
import { UNAUTHORIZED } from "../constants/http";

type CreateSessionPayload = {
    user: UserDocument | null;
    userAgent: string;
    ip: string;
}
type CreateSessionResult = [
    string,
    string
];
export const createSession = async (payload: CreateSessionPayload): Promise<AppResult<CreateSessionResult>> => {
    if (!payload.user) {
        return {
            success: false,
            err: new AppError(UNAUTHORIZED, "Could not find user.")
        };
    }

    const model = new SessionModel({
        userId: payload.user._id,
        
        userAgent: payload.userAgent,
        ip: payload.ip
    });

    await model.save();

    return {
        success: true,
        data: [
            signAccess(payload.user._id, model._id),
            signRefresh(model._id)
        ]
    };
}