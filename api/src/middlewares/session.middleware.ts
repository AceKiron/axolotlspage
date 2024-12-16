import { Request, Response, NextFunction } from "express";

import { verifyAccess, verifyRefresh } from "../utils/jwt";
import { UNAUTHORIZED } from "../constants/http";
import SessionModel from "../models/session.model";
import { signSession } from "../services/session.service";

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
    const accessTokenResult = verifyAccess(req.body.accessToken as string);
    if (accessTokenResult.success) {
        res.locals.session = await SessionModel.findById(accessTokenResult.data.sessionId);
        
        next();
        return;
    }

    const refreshTokenResult = verifyRefresh(req.body.refreshToken as string);
    if (refreshTokenResult.success) {
        res.locals.session = await SessionModel.findById(refreshTokenResult.data.sessionId);
        
        const [ accessToken, refreshToken ] = signSession({
            userId: res.locals.session.userId,
            sessionId: refreshTokenResult.data.sessionId
        });
        
        res.locals.result = {
            ...res.locals.result,
            accessToken, refreshToken
        };

        next();
        return;
    }

    res.status(UNAUTHORIZED).send({
        message: "Invalid session tokens were provided."
    });
}