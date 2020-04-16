    
    //const GOOGLE_API_KEY = 'AIzaSyAuAw09DnunxYW9E9SjcKvYanUYhWcOdLA';
    const GEOCODING_API_KEY = "1ac03d1663a44a149344a23b47ce483f";
    var lat, lang;
   
    function reverseGeoLocationUrl(lat, lon){
        const baseURL = 'https://api.opencagedata.com/geocode/v1/json?'
        const query = 'q=' + lat + ',' + lon
        const key = '&key=' + GEOCODING_API_KEY;
       // return baseURL + query + key;
        console.log(baseURL+query+key);
        $.ajax({
        url: "https://api.opencagedata.com/geocode/v1/json?" + 'q=' + lat + ',' + lon + '&key=' + GEOCODING_API_KEY ,
        method: "GET"
        }).then(function(response) {
         console.log(response.results[0].components.county);
         var county = response.results[0].components.county;
         var road =response.results[0].components.road;
         var state = response.results[0].components.state;
         $("#demo").append(road ,county ,state);

    });
}
    var x = document.getElementById("demo");

    function getLocation() {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        // x.innerHTML = "Latitude: " + position.coords.latitude +
        //     "<br>Longitude: " + position.coords.longitude;
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;
        reverseGeoLocationUrl(lat,lang);
    }
    // function initMap() {
    //     // The location of Uluru
    //     var uluru = {lat: 47.850787, lng: -122.9855};
    //     // The map, centered at Uluru
    //     var map = new google.maps.Map(
    //         document.getElementById('map'), {zoom: 4, center: uluru});
    //     // The marker, positioned at Uluru
    //     var marker = new google.maps.Marker({position: uluru, map: map});
    //   }
    function contactDetails(){
        
    }