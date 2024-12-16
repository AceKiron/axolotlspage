import { Router } from "express";

import { loginHandler, registerHandler } from "../controllers/auth.controller";
import PreMiddleware from "../middlewares/pre.middleware";
import PostMiddleware from "../middlewares/post.middleware";

const AuthRoutes = Router();

AuthRoutes.post("/register", PreMiddleware, registerHandler, PostMiddleware);
AuthRoutes.post("/login", PreMiddleware, loginHandler, PostMiddleware);

export default AuthRoutes;