<h1>My notes on using the Google Maps JS API</h1>

<h3>To add data to maps, there are two options:</h3>

1. Overlays

   - Create the data ourselves programmatically, possibly in response to user input
     Examples:
   - Markers \*
   - Polylines
   - Polygons
   - Circles
   - InfoWindows \*
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

<h3>Instantiating important stuff:</h3>

<h2>Make a map:</h2>

```
function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11
  });

  var latLong = new google.maps.LatLng(39.0997, -94.5786);
  map.setCenter(latLong);

  changeTerrain(map);
```

<h2>Make a marker:</h2>

```
var centerMarker = new.google.maps.Marker({
    icon: [optional imageURL],
    position: new google.maps.LatLng([LAT, LONG]),
    map: map,
    title: "[TITLE HERE]"
});
```

<h2>Make a polyline (polygon is very similar):</h2>

```
var pathCoordinates = [
    new google.maps.LatLng(0, 0),
    new googlemaps.LatLng(0, 1),
];
var pathToCenter = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: false;
    strokeColor: '#fff',
    strokeOpacity: 1.0,
    strokeWeight: 2
});
pathToCenter.setMap(map);
```

<h2>Make an editable polygon:</h2>

```
function drawEditablePolygon(map) {
    var natureCoords = [
        new google.maps.LatLng(0, 1),
        new google.maps.LatLng(0, 2),
        new google.maps.LatLng(0, 3),
        new google.maps.LatLng(0, 4),
    ];

    var natureArea = new google.maps.Polygon({
        path: natureCoords,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.6,
        editable: true
    });

    natureArea.setMap(map);
}
```

<h2>Draw a circle</h2>

```
function drawCircle(map) {
    var circle = new google.maps.Circle({
        map: map,
        center: new google.maps.LatLng (0, 0),
        fillColor: "#92D050",
        fillOpacity: 0.7,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    circle.setRadius(25);
}
```

<h2>Draw a draggable rectangle</h2>

```
function drawDraggableRectangle(map) {
    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(52.340308, -3,052557),
        new google.maps.LatLng(52.340799, -3.050647)
    );
    var rectangle = new google.maps.Rectangle({
        bounds: bounds,
        map: map,
        fillColor: "#00FF00",
        fillOpacity: 0.6,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        draggable: true
    });
}
```

<h2>Make a ground overlay</h2>

<p>Note: the two bounds refer to the southwest and northeast corners of a rectangular overlay.</p>
<p>Note: custom overlays are also an option, but require some elbow grease.</p>

```
function drawGroundOverlay(map) {
    var imageBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(39.1097, -94.5786),
        new google.maps.LatLng(39.179877, -94.509405),
    );

    var groundOverlay = new google.maps.GroundOverlay(
        '/images/[PATH]', imageBounds
    );
    groundOverlay.setMap(map);
};
```