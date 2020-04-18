

  var latitude , longtitude;
  var myCurLat, myCurLong;
    // LOCATION BUTTON SEARCH
    $("#locationBtn").on("click", function (event){
        event.preventDefault();
        console.log("location clicked");
        $("#restaurants").empty();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");    
      }
    })

    function showPosition(position) {
        var lat = position.coords.latitude;
        myCurLat = lat;
        var long = position.coords.longitude;
        myCurLong = long;
        var location = lat + "," + long;
        searchRestaurants(location);
    };

    // RANGE DROPDOWN BUTTON ACTIVATION
    $(".dropdown-trigger").dropdown();

    // CLICK EVENT ON SUBMIT BUTTON - OPEN CAGE DATA AJAX CALL INSIDE
        $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        console.log("button clicked");
        $("#restaurants").empty();
        var userSearch = $(".validate").val();
        var cityNameQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + userSearch + "&key=3cc36a63992d44a2af35f53240a19709";
    
    // AJAX CALL FROM USER INPUT (CITY NAME/ZIP CODE) TO GRAB LATITUDE AND LONGITUDE 
        $.ajax({
            url: cityNameQueryURL,
            method: 'GET',
        }).fail(function(response){
            $(".modal").modal();
            $("#failed-search-modal").modal('open');
        
        }).done(function(response){
            var lat = response.results[0].geometry.lat;
            myCurLat = lat;
            var long = response.results[0].geometry.lng;
            myCurLong = long;
            var location = lat + "," + long;
            searchRestaurants(location);
        });
    });

    // MAIN SEARCH FUNCTION
    function searchRestaurants(location) {
        
            var queryURL;
            var searchRadius;

    // RADIO BUTTONS FOR SEARCH RANGE
        if ($("#1mile").prop("checked")) {
            searchRadius = "1600";
        } 
        else if ($("#2miles").prop("checked")) {
            searchRadius = "3200";
        }
        else if ($("#5miles").prop("checked")) {
            searchRadius = "8000";
        }
        else if ($("#10miles").prop("checked")) {
            searchRadius = "16000";
        }
        else if ($("#20miles").prop("checked")) {
            searchRadius = "32100";
        } else {
            searchRadius = "10000"
        }

    // RADIO BUTTONS FOR TAKEAWAY AND DELIVERY     
        if ($("#delivery").prop("checked")) {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=" + searchRadius + "&type=meal_delivery&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
        }
        else if ($("#takeaway").prop("checked")) {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=" + searchRadius + "&type=meal_takeaway&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
        } else {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=" + searchRadius + "&type=restaurant&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
        };
  
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).fail(function(response){
            $(".modal").modal();
            $("#failed-search-modal").modal('open');
        
        }).done(function(response){
            console.log(queryURL);

    // MODAL IF CALL GETS ZERO RESULTS
        if (response.status == "ZERO_RESULTS") {
                $(".modal").modal();
                $("#no-results-modal").modal('open');
        }

    // CREATING VARIABLES FROM JSON OBJECT RESULTS
        var myLatlng = new google.maps.LatLng(myCurLat, myCurLong);
        var myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Home",
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
        marker.setMap(map);

        for (var i = 0; i < response.results.length; i++) {
        var name = response.results[i].name;
        var rating = response.results[i].rating;
        var address = response.results[i].vicinity;
        var latitude = response.results[i].geometry.location.lat; 
        var longtitude = response.results[i].geometry.location.lng;  
        console.log(latitude);
        console.log(longtitude) 
        plotPoint(map, latitude,longtitude,name);
    // CREATING RESTAURANT RESULT ELEMENTS
        var restaurantColDiv = $("<div class='col s12 m6 l6'></div>");
        var restaurantDiv = $("<div class='card-panel teal lighten-5'></div>");
        var restaurantNameEl = $("<span class='card-title'  id='restaurant-header'>" + name + "</span>");
        var openNowEl = $("<p>OPEN NOW</p>");
        var ratingEl = $("<p>Google rating: " + rating + " / 5" + "</p>");
        var addressEl = $("<p>Address: " + address + "</p>");
        var restaurantContentDiv = $("<div class='card-content black-text'></div>");
        var encodedAddress = encodeURIComponent(address);
        var link = "https://www.google.com/maps/dir/?api=1&destination=" + encodedAddress
        var directionsLink = $("<a target='_blank' href=" + link + ">Directions</a>");

    // APPENDING RESTAURANT ELEMENTS TO PAGE
        restaurantDiv.append(restaurantContentDiv);
        restaurantColDiv.append(restaurantDiv);
        restaurantContentDiv.append(restaurantNameEl);
        restaurantContentDiv.append(openNowEl);
        restaurantContentDiv.append(ratingEl);
        restaurantContentDiv.append(addressEl);
        restaurantContentDiv.append(directionsLink);
        $("#restaurants").append(restaurantColDiv);

        }
      });
    };
    
    function plotPoint(map, lat, lng, name) {
        var myLatlng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            title:name
        });
        marker.setMap(map);
    }
    
       // var map = new google.maps.Map($('#my_map')[0], mapOptions);
        // var customMarker = new google.maps.Marker({
        //     position: latlng,
        //     map: map,
        //     icon: '/wp-content/themes/decevents/img/marker_darkblue.png'
    

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('My location');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}