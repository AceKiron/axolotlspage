import Express from "express";
import Fs from "fs";
import Path from "path";
import CookieParser from "cookie-parser";
import Nunjucks from "nunjucks";
import Axios from "axios";

import RegisterCookies from "./middlewares/registerCookies";
import { translate } from "./utils/locale";
import { UPDATE_LATEST_URL, UPDATE_LATEST_USER_AGENT } from "./constants/env";
import { UNAUTHORIZED } from "./constants/http";

const App = Express();

App.use(CookieParser());

Nunjucks.configure(Path.join(__dirname, "static", "nunjucks"), {
    autoescape: true,
    express: App
});

function StaticFile(filename: string, contentType: string): void {
    Fs.readFile(Path.join(__dirname, "static", filename), (err, data) => {
        if (err) throw err;
        App.get(`/public/${filename.replace(" ", "%20")}`, (req, res) => {
            res.contentType(contentType);
            res.send(data.toString());
        });
    });
}

StaticFile("bundle.css", "text/css");
StaticFile("js/cookie.js", "text/javascript");
StaticFile("js/index.js", "text/javascript");
StaticFile("js/locale.js", "text/javascript");

const updateLatest = async () => {
    rawLatest = (await Axios.get("http://api:3157/bridge/latest")).data.results;
    latest = {};
    // rawLatest = [
    //     {
    //         kind: "SOURCE_RECVEIVED_REVIEW",
    //         timestamp: new Date(2024, 11, 11, 11, 12, 0, 0),
    //         username: "_Mx_Ace",
    //         source: {
    //             id: 1,
    //             link: "www.axolotlcentral.com"
    //         }
    //     },
    //     {
    //         kind: "POST_EDITED",
    //         timestamp: new Date(2024, 11, 11, 11, 2, 0, 0),
    //         username: "_Mx_Ace",
    //         post: {
    //             id: 1,
    //             urlName: "axolotl-care-guide",
    //             displayName: "Axolotl Care Guide"
    //         }
    //     },
    //     {
    //         kind: "POST_PUBLISHED",
    //         timestamp: new Date(2024, 11, 11, 11, 1, 0, 0),
    //         username: "_Mx_Ace",
    //         post: {
    //             id: 1,
    //             urlName: "axolotl-care-guide",
    //             displayName: "Axolotl Care Guide"
    //         }
    //     },
    //     {
    //         kind: "USER_REGISTERED",
    //         timestamp: new Date(2024, 11, 11, 10, 50, 0, 0),
    //         username: "_Mx_Ace"
    //     }
    // ];
}

let rawLatest: any[] = [];
let latest: any = {};

updateLatest();
App.patch(UPDATE_LATEST_URL, (req, res) => {
    if (req.headers["user-agent"] == UPDATE_LATEST_USER_AGENT) updateLatest();
    res.sendStatus(UNAUTHORIZED);
});

App.get("/", RegisterCookies, (req, res) => {
    if (!Object.keys(latest).includes(`${res.locals.locale}-${res.locals.timezone}`)) {
        latest[`${res.locals.locale}-${res.locals.timezone}`] = [Date.now(), rawLatest.map((item) => translate(item, res.locals.locale, res.locals.timezone))];
    }

    res.render("homepage.njk", {
        latest: latest[`${res.locals.locale}-${res.locals.timezone}`][1]
    });
});

App.listen(8080, async () => {
    console.log("Listening on http://localhost:8080/");
});