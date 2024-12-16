import Mongoose from "mongoose";

import AppResult from "../constants/appResult";
import SessionModel, { SessionDocument } from "../models/session.model";
import UserModel, { UserDocument } from "../models/user.model";
import AppError from "../utils/appError";
import { signAccess, signRefresh } from "../utils/jwt";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../constants/http";

type CreateSessionPayload = {
    user: UserDocument | null;
    userAgent: string;
    ip: string;
};
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

type SignSessionPayload = {
    userId: Mongoose.Schema.Types.ObjectId;
    sessionId: Mongoose.Schema.Types.ObjectId;
};
type SignSessionResult = CreateSessionResult;
export const signSession = (payload: SignSessionPayload): SignSessionResult => {
    return [
        signAccess(payload.userId, payload.sessionId),
        signRefresh(payload.sessionId)
    ];
}

type GetSessionInfoPayload = {
    session: SessionDocument;
};
type GetSessionInfoResult = {
    id: Mongoose.Schema.Types.ObjectId;
    
    user: {
        id: Mongoose.Schema.Types.ObjectId;

        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    };
    userAgent: string;
    ip: string;
    createdAt: Date;
    expiresAt: Date;
};
export const getSessionInfo = async (payload: GetSessionInfoPayload): Promise<AppResult<GetSessionInfoResult>> => {
    const user = await UserModel.findById(payload.session.userId);

    if (!user) {
        return {
            success: false,
            err: new AppError(INTERNAL_SERVER_ERROR, "User associated with session doesn't exist.")
        };
    }

    return {
        success: true,
        data: {
            id: payload.session._id,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            userAgent: payload.session.userAgent,
            ip: payload.session.ip,
            createdAt: payload.session.createdAt,
            expiresAt: payload.session.expiresAt
        }
    }
}