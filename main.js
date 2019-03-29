// This is where I instantiate the map:
function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.MEDIUM,
        position: google.maps.ControlPosition.BOTTOM_LEFT
    }
    // disableDefaultUI: true,
    // zoomControl: true,
    // panControl: true,
    // mapTypeControl: true,
    // scaleControl: true,
    // streetViewControl: true,
    // rotateControl: true,
    // overviewMapControl: true 
  });

  var latLong = new google.maps.LatLng(39.0997, -94.5786);
  map.setCenter(latLong);

  changeTerrain(map);
} // end function initialize

// this changeTerrain function receives the map object created in the initialize function
function changeTerrain(map) {
  // goal with this function: link buttons with event handlers and sets map type appropriately
  document.getElementById('btnTerrain').addEventListener("click", function() {
    map.setMapTypeId('terrain');
  });
  document.getElementById("btnRoadmap").addEventListener("click", function() {
    map.setMapTypeId('roadmap');
  });
  document.getElementById("btnSatellite").addEventListener("click", function() {
    map.setMapTypeId('satellite');
  });
  document.getElementById("btnHybrid").addEventListener("click", function() {
    map.setMapTypeId('hybrid');
  });
} // end function changeTerrain

// google.maps.event.addDomListener(window, "load", initialize());
document.addEventListener("load", initialize());

