import { Request, Response, NextFunction } from "express";

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export default (controller: AsyncController): AsyncController => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
        res.locals.err = err;
        next();
    }
}