import { Router } from "express";

import { checkSession } from "../middlewares/session.middleware";
import PreMiddleware from "../middlewares/pre.middleware";
import PostMiddleware from "../middlewares/post.middleware";
import { infoHandler } from "../controllers/session.controller";

const SessionRoutes = Router();

SessionRoutes.get("/info", PreMiddleware, checkSession, infoHandler, PostMiddleware);

export default SessionRoutes;