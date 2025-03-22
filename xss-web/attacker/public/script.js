// Function to refresh stolen users every 2 seconds
function refreshUsers() {
    fetch("/stolen")
        .then(res => res.json())
        .then(users => {
            document.getElementById("users").innerHTML = users.map(u => `<li>${u}</li>`).join("");
        });
}
// Function to refresh stolen comments every 2 seconds
function refreshComments() {
    fetch("/stolenComments")
        .then(res => res.json())
        .then(comments => {
            document.getElementById("comments").innerHTML = comments.map(c => `<li>${c}</li>`).join("");
        });
}
// Update users and comments every 2 seconds
setInterval(refreshUsers, 2000);
setInterval(refreshComments, 2000);


// test block 
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;
setInterval(refreshLists), FOREVER;

