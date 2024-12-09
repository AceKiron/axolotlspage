import Express from "express";
import Fs from "fs";
import Path from "path";
import Nunjucks from "nunjucks";

const App = Express();

App.set("views", Path.join(__dirname, "static", "nunjucks"))

Nunjucks.configure(Path.join(__dirname, "static", "nunjucks"), {
    autoescape: true,
    express: App
});

function StaticFile(filename: string, contentType: string): void {
    Fs.readFile(Path.join(__dirname, "static", filename), (err, data) => {
        if (err) throw err;
        App.get(`/public/${filename}`, (req, res) => {
            res.contentType(contentType);
            res.send(data.toString());
        });
    });
}

StaticFile("bundle.css", "text/css");
StaticFile("js/index.js", "text/javascript");

App.get("/", (req, res) => {
    res.render("test.njk", {
        version: "3.1.5.7"
    });
});

App.listen(8080, async () => {
    console.log("Listening on http://localhost:8080/");
});