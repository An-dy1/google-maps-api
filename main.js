// This is where I instantiate the map:
function initialize() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10
    });

    var latLong = new google.maps.LatLng(39.0997, -94.5786);
    map.setCenter(latLong);
};
// google.maps.event.addDomListener(window, "load", initialize);
document.addEventListener('load', initialize());
