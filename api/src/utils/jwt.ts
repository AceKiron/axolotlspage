import Mongoose from "mongoose";
import Jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/env";

export const signAccess = (userId: Mongoose.Schema.Types.ObjectId, sessionId: Mongoose.Schema.Types.ObjectId) => {
    return Jwt.sign(
        {
            userId,
            sessionId
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "45m"
        }
    );
}

export const signRefresh = (sessionId: Mongoose.Schema.Types.ObjectId) => {
    return Jwt.sign(
        {
            sessionId
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    );
}

type VerifyResult = {
    success: true;
    data: any;
} | {
    success: false;
    err: Error;
}
export const verifyAccess = (token: string): VerifyResult => {
    try {
        return {
            success: true,
            data: Jwt.verify(token, ACCESS_TOKEN_SECRET)
        };
    } catch (err: any) {
        return {
            success: false,
            err
        };
    }
}

export const verifyRefresh = (token: string): VerifyResult => {
    try {
        return {
            success: true,
            data: Jwt.verify(token, REFRESH_TOKEN_SECRET)
        };
    } catch (err: any) {
        return {
            success: false,
            err
        };
    }
}