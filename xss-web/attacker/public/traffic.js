document.getElementById('back-to-dashboard').addEventListener('click', function() {
    window.location.href = 'dashboard.html'; 
});

// Simulate traffic data for the example
function updateTrafficData() {
    document.getElementById('active-users').textContent = Math.floor(Math.random() * 1000);
    document.getElementById('victim-details').textContent = Math.floor(Math.random() * 100);
    document.getElementById('last-update-details').textContent = new Date().toLocaleTimeString();

    // Simulate traffic events
    const events = [
        "User 123 hacked",
        "User 456 targeted",
        "User 789 infiltrated",
        "User 1010 data breached"
    ];
    
    const trafficEventsList = document.getElementById('traffic-events');
    trafficEventsList.innerHTML = '';
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        trafficEventsList.appendChild(li);
    });
}

// Update traffic every 5 seconds
setInterval(updateTrafficData, 5000);

// Initialize traffic data on page load
updateTrafficData();
