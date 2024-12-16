import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.err) {
        return next(res.locals.err);
    }

    res.status(res.locals.status).send(res.locals.result);
}