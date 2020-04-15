$(document).ready(function() {

  // CLICK EVENT ON SUBMIT BUTTON - AJAX CALL INSIDE
  $("#searchBtn").on("click", function (event) {
      event.preventDefault();
      console.log("button clicked");
      var userSearch = $(".validate").val();
      console.log(userSearch);
      var cityNameQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + userSearch + "&key=3cc36a63992d44a2af35f53240a19709";
  
  // AJAX CALL FROM USER INPUT (CITY NAME/ZIP CODE) TO GRAB LATITUDE AND LONGITUDE 
      $.ajax({
          url: cityNameQueryURL,
          method: 'GET',
      }).done(function(response){
          console.log(response);
          var lat = response.results[0].geometry.lat;
          console.log("Lat: " + lat);
          var long = response.results[0].geometry.lng;
          console.log("Long: " + long);
          var location = lat + "," + long;
        
          //var meal_takeaway = $("#takeaway");
          //var meal_delivery = $("#delivery");
          var queryURL ="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=meal_delivery&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
                         https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=50.724489,-3.527855&radius=10000&type=meal_delivery&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c


        //if (meal_delivery.clicked === true) {
        //queryURL =
        //} 
        // else if (meal_takeaway.clicked === true) {
        // queryURL ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=meal_takeaway&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
        // } else {
        // queryURL ="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=10000&type=meal_delivery&type=meal_takeaway&opennow=true&key=AIzaSyApNMnp_rkqJzxJaSxvpit0MvEhVw1vm7c";
        // }

        $.ajax({
          url: queryURL,
          method: 'GET',
      }).done(function(response){
          console.log(response);
          for (var i = 0; i < 20; i++) {
            console.log(response.results[i].name)
            
              var restaurantDiv = $("<div>");
              var card = $("<div>").addClass("card grey-grey darken-1");
              var body = $("<div>").addClass("card-content");
              var title = $("<h5>").addClass("card-title").text(response.results[i].name);
              var p1 = $("<p>").addClass("card-text").text("address:" + response.results[i].vicinity);
            
              // merge together and put on page
              restaurantDiv.append(card.append(body.append(title, p1)));
              $("#restaurant.row").append;
        }

          });
        });
        });
      });


     //may have to loop through both results.name & results.vicinity...