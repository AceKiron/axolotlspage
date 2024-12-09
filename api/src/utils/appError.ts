import { HttpStatusCode } from "../constants/http";

export default class AppError extends Error {
    constructor(
        public status: HttpStatusCode,
        public message: string
    ) {
        super(message);
    }
}