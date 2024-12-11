import CatchErrors from "../utils/catchErrors";
import UserModel from "../models/user.model";
import { registerUser, loginUser } from "../services/auth.service";
import { createSession } from "../services/session.service";
import { CREATED, OK } from "../constants/http";

export const registerHandler = CatchErrors(async (req, res) => {
    const result = await registerUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    if (!result.success) {
        return res.status(result.err.status).send({
            message: result.err.message
        });
    }

    const result2 = await createSession({
        user: await UserModel.findById(result.data),
        userAgent: req.headers["user-agent"] || "",
        ip: req.ip || ""
    });

    if (!result2.success) {
        return res.status(result2.err.status).send({
            message: result2.err.message
        });
    }

    return res.status(CREATED).send({
        session: result2.data
    });
});

export const loginHandler = CatchErrors(async (req, res) => {
    const result = await loginUser({
        email: req.body.email,
        password: req.body.password
    });

    if (!result.success) {
        return res.status(result.err.status).send({
            message: result.err.message
        });
    }

    const result2 = await createSession({
        user: await UserModel.findById(result.data),
        userAgent: req.headers["user-agent"] || "",
        ip: req.ip || ""
    });

    if (!result2.success) {
        return res.status(result2.err.status).send({
            message: result2.err.message
        });
    }

    return res.status(OK).send({
        session: result2.data
    });
});