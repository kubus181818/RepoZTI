function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(-34.397, 150.644)
    };
    console.log("Initializing maps...");
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
    '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
    console.log("Loading google maps...");
}

window.onload = loadScript;


$('#myCarousel').bind('slide.bs.carousel', function() {
    currentIndex = $('div.active').index() + 1;
    console.log(currentIndex);
    console.log("test");

    var mapOptions;

    if(currentIndex===1) {
        mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        };
    }else if(currentIndex===2){
        mapOptions = {
            center: new google.maps.LatLng(34.397, 110.644),
            zoom: 8
        };
    }else if(currentIndex===3){
        mapOptions = {
            center: new google.maps.LatLng(44.397, 10.644),
            zoom: 8
        };
    }

    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
});