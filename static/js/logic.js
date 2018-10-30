// Creating map object

var myMap = L.map("map", {
  center: [-60,10],
  zoom: 1.5
});



L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



// Grab the data with d3
d3.json(url, function(response) {
  var markers = L.markerClusterGroup();
  // Loop through the features array
  for (var i = 0; i < response.features.length; i++) {

    var location=response.features[i].geometry.coordinates;
    
      // Check for location property
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location[1], location[0]])
          .bindPopup(response.features[i].properties.mag));
      }
    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
 
});









