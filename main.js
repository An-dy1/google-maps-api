// This is where I instantiate the map:
var map;
var bikeRouteButtonState = 0;
var bikeRouteLayer = new google.maps.BicyclingLayer();
var bikeButton = document.getElementById("showBike");
var geocoder = new google.maps.Geocoder();

function initialize() {
  map = new google.maps.Map(document.getElementById("map"), {
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
  drawBikeRoutes(map);
  drawMarkers(map);

  //   Maybe do this for the Line Creek trail if I can find KML data for it: see README.md for the way
  //   addKmlLayer(map);

  addGoToInitialExtent(map, latLong, initialZoom);
} // end function initialize

// this changeTerrain function receives the map object created in the initialize function
function changeTerrain(map) {
  /*
   * First way to do this
   */
  // goal with this function: link buttons with event handlers and sets map type appropriately
  // document.getElementById("btnRoadmap").addEventListener("click", function() {
  //   map.setMapTypeId("roadmap");
  // });

  // Do this with DOM listener:
  google.maps.event.addDomListener(btnRoadmap, "click", function() {
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
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

  var mackenContentString =
    "<p>Macken Park in North Kansas City<br>" +
    "has a nice paved wheel track, probably a<br>half mile long.</p>" +
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
  mackenMarker.addListener("click", function() {
    mackenInfoWindow.open(map, mackenMarker);
  });

  var tonkaContentString =
    "<p>The parking lot of Winnetonka High School<br>" +
    "when not in use by high school students<br>" +
    "has a lovely slope to it.</p>";

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
  tonkaMarker.addListener("click", function() {
    tonkaInfoWindow.open(map, tonkaMarker);
  });

  var cliffContentString = "<p>Cliff Drive. Nuf said.</p>";

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
  cliffMarker.addListener("click", function() {
    cliffInfoWindow.open(map, cliffMarker);
  });

  var smithvilleContentString =
    "<p>Multi-mile paved bike trails<br>" + "surrounding the lake.</p>";

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
  smithvilleMarker.addListener("click", function() {
    smithvilleInfoWindow.open(map, smithvilleMarker);
  });

  var markerCluster = new MarkerClusterer(map, markers);
  return markerCluster;
}

function swapBikeButtonText() {
  if (bikeButton.getAttribute("data-text-swap") == bikeButton.innerHTML) {
    bikeButton.innerHTML = bikeButton.getAttribute("data-text-original");
  } else {
    bikeButton.setAttribute("data-text-original", bikeButton.innerHTML);
    bikeButton.innerHTML = bikeButton.getAttribute("data-text-swap");
    console.log("made it here at least");
  }
}

function drawBikeRoutes(map) {
  bikeButton.addEventListener(
    "click",
    function() {
      if (bikeRouteButtonState === 0) {
        bikeRouteLayer.setMap(map);
        bikeRouteButtonState += 1;
        swapBikeButtonText();
      } else {
        bikeRouteLayer.setMap(null);
        bikeRouteButtonState -= 1;
        swapBikeButtonText();
      }
    },
    false
  );
}

function geocodeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var coordsResult = results[0].geometry.location.toString();
      var newCoordsDiv = document.getElementById('newCoords');
      newCoordsDiv.innerHTML = coordsResult;
    } else {
      alert("Error " + status);
    }
  });
}

function calcRoute() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay;
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  var start = document.getElementById('start').value;
  var end = new google.maps.LatLng(39.148627, -94.567244);
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    } else {
      alert("Hmm, something went wrong.")
    }
  });
}

// google.maps.event.addDomListener(window, "load", initialize());
document.addEventListener("load", initialize());
