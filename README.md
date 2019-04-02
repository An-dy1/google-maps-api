<h3>Instantiating important stuff:</h3>

<h2>Make a map:</h2>
```function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11
  });

  var latLong = new google.maps.LatLng(39.0997, -94.5786);
  map.setCenter(latLong);

  changeTerrain(map);```

<h2>Make a marker:</h2>
```var centerMarker = new.google.maps.Marker({
    icon: [optional imageURL],
    position: new google.maps.LatLng([LAT, LONG]),
    map: map,
    title: "[TITLE HERE]"
});```

<h2>Make a polyline (polygon is very similar):</h2>
```var pathCoordinates = [
    new google.maps.LatLng(0, 0),
    new googlemaps.LatLng(0, 1),
];
var pathToCenter = new google.maps.Polyline({
    path: pathCoordinates,
    strokeColor: '#fff',
    strokeOpacity: 1.0,
    strokeWeight: 2
});
pathToCenter.setMap(map);```

<h2>Draw a circle</h2>
```var circle = new google.maps.Circle({
    map: map,
    center: new google.maps.LatLng (0, 0),
    fillColor: "#92D050",
    fillOpacity: 0.7,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2
});
circle.setRadius(25);```

<h3>To add data to maps, there are two options:</h3>

1. Overlays
    - Create the data ourselves programmatically, possibly in response to user input
    Examples:
    - Markers *
    - Polylines
    - Polygons
    - Circles
    - InfoWindows *
    - Ground overlays
    - Custom overlays

2. Layers
    - Bring in data from somewhere else
    Examples:
    - KML Layers
    - Weather/Cloud
    - Heatmap
    - Traffic
    - Transit
    - Bicycle


