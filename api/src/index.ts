import Express from "express";
import Cors from "cors";
import CookieParser from "cookie-parser";

import ConnectToDatabase from "./config/db";

import AuthRoutes from "./routes/auth.route";
import BridgeRoutes from "./routes/bridge.route";

const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(CookieParser());

App.use(Cors({}));

App.get("/", (req, res) => {
    res.sendStatus(200);
});

App.use("/auth", AuthRoutes);

App.use("/bridge", BridgeRoutes);

App.listen(3157, async () => {
    console.log("Listening on http://localhost:3157/");
    await ConnectToDatabase();
});