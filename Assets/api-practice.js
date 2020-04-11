

function testingAPI() {
queryURL = "https://api.yelp.com/v3/businesses/search?term=pizza?location=Seattle";


    $.ajax({
        url: queryURL,
        headers: {
            'Authorization':'Bearer T70YHIWJA6ASHZ612TjqJG1AJWR0Xn-9fjik3GHwDfnCr0UGGgOFmh9Juyj9tQ7QjmxaaQhQqa3NyWMyhFxNMx4RH-MW3AVOF-iDhMWQf3C76tW-_kd8K-NuYt6PXnYx'
        },
          method: 'GET',
    }).done(function(response){
        console.log(response);
    })
}

testingAPI();

// testing








