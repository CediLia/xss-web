const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
let comments = [];
app.post("/submit", (req, res) => {
    comments.push(req.body.comment);
    res.redirect("/");
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/comments", (req, res) => {
    res.json(comments);
});
app.listen(3000, () => console.log("Victim site running at http://localhost:3000"));
