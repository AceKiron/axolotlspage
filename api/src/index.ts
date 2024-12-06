import Express from "express";

const App = Express();

App.get("/", (req, res) => {
    res.sendStatus(418);
})

App.listen(3157, () => {
    console.log("Listening on http://localhost:3157/")
});