import { Router } from "express";

import { registerHandler } from "../controllers/auth.controller";

const AuthRoutes = Router();

AuthRoutes.post("/register", registerHandler);

export default AuthRoutes;