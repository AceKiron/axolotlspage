import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    res.locals.status = 200;
    res.locals.result = {};

    next();
}