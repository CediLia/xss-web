// dashboard.js - Handles Dashboard traffic information and updates
let victimCount = 0;
let trafficCount = 0;

// Function to refresh traffic stats
function refreshTraffic() {
    // Update the victim count and traffic count with every fetch
    document.getElementById("victim-count").textContent = victimCount;
    document.getElementById("traffic-count").textContent = trafficCount;
    document.getElementById("last-update").textContent = new Date().toLocaleTimeString();
}

// Fetch users and comments from the attacker server
function fetchData() {
    fetch("/stolen")
        .then(res => res.json())
        .then(users => {
            // Update users list
            document.getElementById("users").innerHTML = users.map(u => `<li>${u}</li>`).join("");
            // Update victim count
            victimCount = users.length; // Total number of users
            trafficCount = Math.floor(Math.random() * 100); // Simulate real-time traffic count
            refreshTraffic(); // Call refreshTraffic after fetching and updating the data
        });
    
    fetch("/stolenComments")
        .then(res => res.json())
        .then(comments => {
            // Update comments list
            document.getElementById("comments").innerHTML = comments.map(c => `<li>${c}</li>`).join("");
        });
}

// Fetch data every 2 seconds
setInterval(fetchData, 2000);

// Fetch data once on page load to initialize
fetchData();
