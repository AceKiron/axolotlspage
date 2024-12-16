import CatchErrors from "../utils/catchErrors";
import UserModel from "../models/user.model";
import { registerUser, loginUser } from "../services/auth.service";
import { createSession } from "../services/session.service";
import { CREATED, OK } from "../constants/http";

export const registerHandler = CatchErrors(async (req, res, next) => {
    const result = await registerUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    if (!result.success) {
        res.locals.status = result.err.status;
        res.locals.result = {
            ...res.locals.result,
            error: result.err.message
        };
        return next();
    }

    const result2 = await createSession({
        user: await UserModel.findById(result.data),
        userAgent: req.headers["user-agent"] || "",
        ip: req.ip || ""
    });

    if (!result2.success) {
        res.locals.status = result2.err.status;
        res.locals.result = {
            ...res.locals.result,
            error: result2.err.message
        };
        return next();
    }

    res.locals.status = CREATED;
    res.locals.result = {
        ...res.locals.result,
        accessToken: {
            value: result2.data[0],
            maxAge: 45 * 60 * 1000
        },
        refreshToken: {
            value: result2.data[1],
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    };

    return next();
});

export const loginHandler = CatchErrors(async (req, res, next) => {
    const result = await loginUser({
        email: req.body.email,
        password: req.body.password
    });

    if (!result.success) {
        res.locals.status = result.err.status;
        res.locals.result = {
            ...res.locals.result,
            error: result.err.message
        };
        return next();
    }

    const result2 = await createSession({
        user: await UserModel.findById(result.data),
        userAgent: req.headers["user-agent"] || "",
        ip: req.ip || ""
    });

    if (!result2.success) {
        res.locals.status = result2.err.status;
        res.locals.result = {
            ...res.locals.result,
            error: result2.err.message
        };
        return next();
    }

    res.locals.status = OK;
    res.locals.result = {
        ...res.locals.result,
        accessToken: {
            value: result2.data[0],
            maxAge: 45 * 60 * 1000
        },
        refreshToken: {
            value: result2.data[1],
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    };

    return next();
});