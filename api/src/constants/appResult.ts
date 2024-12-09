import AppError from "../utils/appError";

type AppResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    err: AppError;
}

export default AppResult;