<h1>Snapshots</h1>

<h3>11 April - afternoon</h3>
![11 April](/images/11-april-1.png)
![11 April 2](/images/11-april-2.png)

<h1>My notes on using the Google Maps JS API</h1>

<h2>To add data to maps, there are two options:</h2>

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

<h2>Instantiating important stuff:</h2>

<h3>Make a map:</h3>

```
function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11
  });

  var latLong = new google.maps.LatLng(39.0997, -94.5786);
  map.setCenter(latLong);

  changeTerrain(map);
```

<h3>Make a marker:</h3>

```
var centerMarker = new.google.maps.Marker({
    icon: [optional imageURL],
    position: new google.maps.LatLng([LAT, LONG]),
    map: map,
    title: "[TITLE HERE]"
});
```

<h3>Make a polyline (polygon is very similar):</h3>

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

<h3>Make an editable polygon:</h3>

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
        strokeWeight: 3,
        fillColor: "#00FF00",
        fillOpacity: 0.6,
        editable: true
    });

    natureArea.setMap(map);
}
```

<h3>Draw a circle</h3>

```
function drawCircle(map) {
    var circle = new google.maps.Circle({
        map: map,
        center: new google.maps.LatLng (0, 0),
        fillColor: "#92D050",
        fillOpacity: 0.7,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3
    });
    circle.setRadius(25);
}
```

<h3>Draw a draggable rectangle</h3>

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

<h3>Make a ground overlay</h3>

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

<h2>KML Layers and GeoRSS</h2>

<ul>
    <li>Layers represent collections of objects with a common association</li>
    <li>They are manipulated as a single unit</li>
</ul>

<h4>What is KML?</h4>

<ul>
    <li>Keyhole Markup Language</li>
    <li>Used to encode and display geographic data</li>
    <li>Terrain and elevation data</li>
    <li>Historical imagery</li>
    <li>Based on XML standard</li>
    <li>Must use google.maps.KmlLayer class</li>
    <li>KmlLayerOptions includes map control, preserveViewPort option, and suppressInfoWindows</li>
    <li>KmlLayerMetaData includes name, description, author, etc.</li>
</ul>

<h4>Example:</h4>

```
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
    <Placemark>
    <name>Longboard Locale</name>
    <description>This is where we longboard</description>
        <Point>
            <coordinates>
                -50, 52, 0
            </coordinates>
        </Point>
    </Placemark>
</kml>
```

<h4>More examples:</h4>

<ul>
    <li>Google Earth gallery</li>
    <li>US Census data</li>
    <li>Global Administrative Areas</li>
    <li>"filetype:kml 'Lord of the Rings'"</li>
</ul>

<h4>What is GeoRSS?</h4>

<ul>
    <li>Emerging (?) standard for encoding location as part of a web feed</li>
    <li>Google maps can read GeoRSS feeds and use KML data to layer it on the map</li>
</ul>

```
function addKmlLayer(map) {
    var katyTrailLayer = new google.maps.KmlLayer('http://veloroutes.org/r/40124/kml');
    katyTrailLayer.setMap(map);
}
```

<h2>Adding GeoJSON data</h2>

```
function addGeoJSONDataLayer(map) {
    map.data.loadGeoJson('/add/path/here.json');
    map.data.setStyle({
        icon: '/set/path/here.pgn',
        strokeColor: 'aliceblue'
    })
}
```