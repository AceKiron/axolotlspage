import { Router } from "express";

import { loginHandler, registerHandler } from "../controllers/auth.controller";

const AuthRoutes = Router();

AuthRoutes.post("/register", registerHandler);
AuthRoutes.post("/login", loginHandler);

export default AuthRoutes;