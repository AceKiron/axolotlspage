export const OK = 200;
export const CREATED = 201;
export const UNAUTHORIZED = 401;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;

export type HttpStatusCode =
    | typeof OK
    | typeof CREATED
    | typeof UNAUTHORIZED
    | typeof CONFLICT
    | typeof INTERNAL_SERVER_ERROR
;