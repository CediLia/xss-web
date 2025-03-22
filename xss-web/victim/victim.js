const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

let comments = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/comments", (req, res) => {
    res.json(comments);
});

app.post("/submit", (req, res) => {
    comments.push(req.body.comment);
    res.redirect("/");
});

// Endpoint to handle stealing of comments (from victim's form)
app.get("/stealComment", (req, res) => {
    const { username, comment } = req.query;
    console.log(`Stolen comment from ${username}: ${comment}`);
    // Store the stolen comment data here (for demonstration purposes, you can log it)
    comments.push({ username, comment });
    res.send("Comment stolen successfully");
});

app.listen(3000, () => console.log("Victim site running at http://localhost:3000"));
