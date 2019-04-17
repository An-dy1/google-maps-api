// This is where I instantiate the map:
var bikeRouteButtonState = '';

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

  // I don't remember why I wasn't able to just setCenter in the map initializing stuff
  var latLong = new google.maps.LatLng(39.1097, -94.5786);
  map.setCenter(latLong);

  // this is called addButtons(map) in the tutorial
  changeTerrain(map);
  // bikeRouteButtonState = 'unclicked';
  drawBikeRoutes(map);
  drawMarkers(map);

//   Maybe do this for the Line Creek trail if I can find KML data for it: see README.md for the way
//   addKmlLayer(map);

  addGoToInitialExtent(map, latLong, initialZoom);

} // end function initialize

// this changeTerrain function receives the map object created in the initialize function
function changeTerrain(map) {
  // goal with this function: link buttons with event handlers and sets map type appropriately
  document.getElementById("btnRoadmap").addEventListener("click", function() {
    map.setMapTypeId("roadmap");
  });
  document.getElementById("btnTerrain").addEventListener("click", function() {
    map.setMapTypeId("terrain");
  });
  document.getElementById("btnSatellite").addEventListener("click", function() {
    map.setMapTypeId("satellite");
  });
  document.getElementById("btnHybrid").addEventListener("click", function() {
    map.setMapTypeId("hybrid");
  });
} // end function changeTerrain

function drawMarkers(map) {
  var markers = [];
  var image = "./images/new-skateboard.png";

  var mackenContentString = '<p>Macken Park in North Kansas City<br>' +
  'has a nice paved wheel track, probably a<br>half mile long.</p>'+
  '<img src="./images/mackenWheelPark.jpg" alt="Macken Wheel Park" height=50% width=50% />';

  var mackenInfoWindow = new google.maps.InfoWindow({
    content: mackenContentString
  });

  var mackenMarker = new google.maps.Marker({
    icon: image,
    position: new google.maps.LatLng(39.148627, -94.567244),
    map: map,
    title: "Macken Wheel Park"
  });
  markers.push(mackenMarker);
  // Another way to do this:
  // mackenMarker.setMap(map);
  mackenMarker.addListener('click', function() {
    mackenInfoWindow.open(map, mackenMarker);
  });

  var tonkaContentString = '<p>The parking lot of Winnetonka High School<br>' +
  'when not in use by high school students<br>' +
  'has a lovely slope to it.</p>';

  var tonkaInfoWindow = new google.maps.InfoWindow({
    content: tonkaContentString
  });

  var tonkaMarker = new google.maps.Marker({
    icon: image,
    position: new google.maps.LatLng(39.179877, -94.509405),
    map: map,
    title: "Winnetonka HS parking lot"
  });
  markers.push(tonkaMarker);
  tonkaMarker.addListener('click', function(){
    tonkaInfoWindow.open(map, tonkaMarker);
  });

  var cliffContentString = '<p>Cliff Drive. Nuf said.</p>';

  var cliffInfoWindow = new google.maps.InfoWindow({
    content: cliffContentString
  });

  var cliffMarker = new google.maps.Marker({
    icon: image,
    position: new google.maps.LatLng(39.11583, -94.545145),
    map: map,
    title: "Cliff Drive"
  });
  markers.push(cliffMarker);
  cliffMarker.addListener('click', function(){
    cliffInfoWindow.open(map, cliffMarker)
  });

  var smithvilleContentString = '<p>Multi-mile paved bike trails<br>' +
  'surrounding the lake.</p>';

  var smithvilleInfoWindow = new google.maps.InfoWindow({
    content: smithvilleContentString
  });

  var smithvilleMarker = new google.maps.Marker({
    icon: image,
    position: new google.maps.LatLng(39.447035, -94.529748),
    map: map,
    title: "Smithville paved trails"
  });
  markers.push(smithvilleMarker);
  smithvilleMarker.addListener('click', function(){
    smithvilleInfoWindow.open(map, smithvilleMarker)
  });

  var markerCluster = new MarkerClusterer(map, markers);
  return markerCluster;
}

function drawBikeRoutes(map) {
  document.getElementById('showBike').addEventListener("click", function() {
      var bikeRouteLayer = new google.maps.BicyclingLayer;
      bikeRouteLayer.setMap(map);
  });
};


// TODO: add a state, so that if the button is clicked and bike routes are already shown, it removes the bike routes
// TODO: change the text within the button so that it appears as "show" or "hide"
// function drawBikeRoutes(map) {
//     var bikeButton = document.getElementById('showBike');
//     bikeButton.addEventListener("click", function() {
//       var bikeRouteLayer = new google.maps.BicyclingLayer;
//       bikeRouteLayer.setMap(map);
        // if(bikeButton.getAttribute("data-text-swap") == bikeButton.innerHTML) {
        //     bikeButton.innerHTML = bikeButton.getAttribute("data-text-original");
        // } else {
        //     bikeButton.setAttribute("data-text-original", button.innerHTML);
        //     bikeButton.innerHTML = bikeButton.getAttribute("data-text-swap");
        // }

        // if(bikeRouteButtonState === 'unclicked') {
        //     var bikeRouteLayer = new google.maps.BicyclingLayer;
        //     bikeRouteLayer.setMap(map);
        //     bikeRouteButtonState === 'clicked';
        // }else if(bikeRouteButtonState === 'clicked') {
        //     bikeRouteLayer.setMap(null);
        //     bikeRouteButtonState === 'unclicked';
        // }
//     });
// }

// google.maps.event.addDomListener(window, "load", initialize());
document.addEventListener("load", initialize());
