import { Router } from "express";

import { updateLatestHandler } from "../controllers/bridge.controller";

const BridgeRoutes = Router();

BridgeRoutes.get("/latest", updateLatestHandler);

export default BridgeRoutes;