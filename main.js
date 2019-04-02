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
    // TODO: figure out path to image I need
    var image = "./images/skateboard.svg"
}

// google.maps.event.addDomListener(window, "load", initialize());
document.addEventListener("load", initialize());

