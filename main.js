// This is where I instantiate the map:
function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    disableDefaultUI: true,
    // all but the mapTypeControl is enabled (because our buttons are doing that job)
    zoomControl: true,
    panControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    overviewMapControl: true
  });

  var latLong = new google.maps.LatLng(39.0997, -94.5786);
  map.setCenter(latLong);

  changeTerrain(map); // this is called addButtons(map) in the tutorial

  drawMarkers(map);
//   drawPolyline(map);
//   drawEditablePolygon(map);
//   drawDraggableRectangle(map);
//   drawCircle(map);
} // end function initialize

// this changeTerrain function receives the map object created in the initialize function
function changeTerrain(map) {
  // goal with this function: link buttons with event handlers and sets map type appropriately
  document.getElementById("btnRoadmap").addEventListener("click", function() {
    map.setMapTypeId('roadmap');
  });
  document.getElementById('btnTerrain').addEventListener("click", function() {
    map.setMapTypeId('terrain');
  });
  document.getElementById("btnSatellite").addEventListener("click", function() {
    map.setMapTypeId('satellite');
  });
  document.getElementById("btnHybrid").addEventListener("click", function() {
    map.setMapTypeId('hybrid');
  });
} // end function changeTerrain

function drawMarkers(map) {
    var markers = [];
    var image = './images/skateboarding-512.png';

    var mackenMarker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(39.148627, -94.567244),
        map: map,
        title: "Macken Wheel Park"
    });
    markers.push(mackenMarker);
    
    var tonkaMarker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(39.179877, -94.509405),
        map: map,
        title: "Winnetonka HS parking lot"
    });
    markers.push(tonkaMarker);

    var markerCluster = new MarkerClusterer(map, markers);
    return markerCluster;
}

// google.maps.event.addDomListener(window, "load", initialize());
document.addEventListener("load", initialize());

