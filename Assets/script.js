  
$(document).ready(function() {

    // CLICK EVENT ON SUBMIT BUTTON - AJAX CALL INSIDE
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        $("#restaurants").empty();
        // console.log("button clicked");
        var userSearch = $(".validate").val();
        // console.log(userSearch);
        var cityNameQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + userSearch + "&key=3cc36a63992d44a2af35f53240a19709";
    
    // AJAX CALL FROM USER INPUT (CITY NAME/ZIP CODE) TO GRAB LATITUDE AND LONGITUDE 
        $.ajax({
            url: cityNameQueryURL,
            method: 'GET',
        }).done(function(response){
            // console.log(response);
            var lat = response.results[0].geometry.lat;
            // console.log("Lat: " + lat);
            var long = response.results[0].geometry.lng;
            // console.log("Long: " + long);
            var location = lat + "," + long;
        
            var queryURL;

            // RADIO BUTTONS FOR TAKEAWAY AND DELIVERY     
            if ($("#delivery").prop("checked")) {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=meal_delivery&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
            }
            else if ($("#takeaway").prop("checked")) {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=meal_takeaway&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
            } else {
                queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=restaurant&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
            };
  
          $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function(response){
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
              var name = response.results[i].name;
              var rating = response.results[i].rating;
              var address = response.results[i].vicinity;
              

        // Creating Forecast HTML elements
        var restaurantColDiv = $("<div class='col s12 m6 l6'></div>");
        var restaurantDiv = $("<div class='card-panel grey-grey'></div>");
        var restaurantNameEl = $("<span class='card-title'  id='restaurant-header'>" + name + "</span>");
        var openNowEl = $("<p>OPEN NOW</p>");
        var ratingEl = $("<p>Google rating: " + rating + " / 5" + "</p>");
        var addressEl = $("<p>Address: " + address + "</p>");
        var restaurantContentDiv = $("<div class='card-content black-text'></div>");
        var encodedAddress = encodeURIComponent(address);
        var link = "https://www.google.com/maps/dir/?api=1&destination=" + encodedAddress
        var directionsLink = $("<a target='_blank' href=" + link + ">Directions</a>");

        // Appending forecast elements to the HTML
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
          });
          });
        });
  
  
