let map, directionsService, directionsRenderer;
let trafficLayer;

function initMap() {
    // Initialize the map with Delhi coordinates
    const delhi = { lat: 28.6139, lng: 77.2090 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: delhi,
        zoom: 12,
    });

    // Initialize Directions Service and Renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Initialize Traffic Layer for real-time traffic updates
    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

function findRoute() {
    const origin = document.getElementById('origin-input').value;
    const destination = document.getElementById('destination-input').value;

    if (!origin || !destination) {
        alert("Please enter both origin and destination.");
        return;
    }

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC,
    };

    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);

            // Get and display route details
            const route = response.routes[0].legs[0];
            document.getElementById('distance').textContent = route.distance.text;
            document.getElementById('duration').textContent = route.duration.text;

            // Estimate fare based on distance (example: ₹10 per km)
            const distanceInKm = route.distance.value / 1000; // converting meters to kilometers
            const fare = distanceInKm * 10; // Assume ₹10 per km
            document.getElementById('fare').textContent = fare.toFixed(2);

            // Traffic Congestion level (simplified, you can make this more complex with real data)
            const congestionLevel = "Moderate"; // Replace with real-time data if available
            document.getElementById('congestion-level').textContent = congestionLevel;
        } else {
            alert("Unable to find route. Please try again.");
        }
    });
}

// Call initMap when the Google Maps API is loaded
window.initMap=initMap;