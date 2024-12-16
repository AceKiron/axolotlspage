import CatchErrors from "../utils/catchErrors";
import { getSessionInfo } from "../services/session.service";

export const infoHandler = CatchErrors(async (req, res, next) => {
    const result = await getSessionInfo({
        session: res.locals.session
    });

    if (result.success) {
        res.locals.result = {
            ...res.locals.result,
            ...result.data
        };
        return next();
    }

    res.locals.status = result.err.status;
    res.locals.result = {
        ...res.locals.result,
        error: result.err.message
    };
    
    return next();
});