
$(document).ready(function() {

// AJAX CALL FROM USER INPUT (CITY NAME/STATE) TO GRAB LATITUDE AND LONGITUDE 
var userSearch = "98103"
var cityNameQueryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + userSearch + "&key=3cc36a63992d44a2af35f53240a19709";

    $.ajax({
        url: cityNameQueryURL,
        method: 'GET',
    }).done(function(response){
        console.log(response);
        var lat = response.results[0].geometry.lat;
        console.log("Lat: " + lat);
        var long = response.results[0].geometry.lng;
        console.log("Long: " + long);


    })
});



    // function testingAPI() {
// queryURL = "https://developers.zomato.com/api/v2.1/locations?query=denver&lat=39&lon=-104";

//     $.ajax({
//         url: queryURL,
//         headers: {
//             'user-key':'bd33447588fb9817164b8c1f3167fb68'
//         },
//           method: 'GET',
//     }).done(function(response){
//         console.log(response);
//         var entityType = response.location_suggestions[0].entity_type;
//         console.log(entityType);
//         var entityID = response.location_suggestions[0].entity_id;
//         console.log(entityID);
//         var restaurantQueryURL = "https://developers.zomato.com/api/v2.1/locations?query"

// // Second Ajax call for restaurant list
//         $.ajax({
//             url: restaurantQueryURL,
//             headers: {
//                 'user-key':'bd33447588fb9817164b8c1f3167fb68'
//             },
//               method: 'GET',
//         }).done(function(response){
//             console.log(response);
//         }
//     })

   


// testingAPI();

// });


