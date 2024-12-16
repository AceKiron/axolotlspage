import { Router } from "express";

import { updateLatestHandler } from "../controllers/bridge.controller";
import PreMiddleware from "../middlewares/pre.middleware";
import PostMiddleware from "../middlewares/post.middleware";

const BridgeRoutes = Router();

BridgeRoutes.get("/latest", PreMiddleware, updateLatestHandler, PostMiddleware);

export default BridgeRoutes;