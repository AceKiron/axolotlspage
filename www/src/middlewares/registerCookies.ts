import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    let locale = "en-GB";
    if (req.cookies.locale) locale = req.cookies.locale;
    else res.cookie("locale", "en-GB");

    let timezone = "Europe/London";
    if (req.cookies.TZ) timezone = req.cookies.TZ;
    else res.cookie("TZ", "Europe/London");

    res.locals.locale = locale;
    res.locals.timezone = timezone;

    next();
}