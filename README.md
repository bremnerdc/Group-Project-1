# Support Local Restaurants
* Finding local restaurants that are currently open and available for either take out or delivery
## User Story
* “As a foodie during the Covid-19 pandemic, I want to know what local restaurants I can still frequent.”
## What it does
* Our website allows uses to search for local restaurants that are open right now and that offer either takeout or delivery. Users can customize their search to include whether they want take out, deliver, and the distance from either a specific city/zipcode, or they can search by their current location. The results give the restaurants name, address, Google rating, and a link to directions from the users current location to the restaurant.
## Technologies Used
* HTML
* CSS
* Materialize CSS Framework
* Font Awesome
* JQuery and Javascript
* Google Places API
* OpenCage Data API
## How we built it
* We built the layout of our page using Materialize CSS Framework. We used cards, search inputs, radio buttons, dropdown buttons, and icons.
* The page begins with a series of search options for the users. Depending on what they choose, a specific series of Ajax calls are made and the results are rendered on the page in a series of cards.
* First, the user can search by "current location." This calls the geolocation function built into the brower. After the user allows for the use of their location, it automatically performs the Ajax call using the latitude and longitude of the user. If the user selected any of the search options (takeaway/delivery or search range options) those are also applied to the "current location" search, and the results are displayed on the page
* If the user chooses to type a city or zip code into the input field they also have the option for takeaway/delivery and search range. When they click submit whatever they put in the input field (city or zipcode) is thrown into an Ajax call to OpenCage API which returns the latitude and longitude of the top result for the given search query. The latitude and longitude is passed to the Google API through an Ajax call. This returns twenty restaurants which are are shown on the page.
## Breakdown of Tasks and Roles
* Sabah - Maps API, About Us, Location search
* Dylan - Materialize, front end design, Google API
* Grant - JQuery/Javascript, OpenCage API
## Challenges
* Version control and merging
* Google API Functionality
## Successes
* Clear communication
* Adapting the vision as the project went along
* Focues on producing MVP
## Application in Action
****************************
## Deployed Link
* https://bremnerdc.github.io/Group-Project-1/
## Future features to add
* Add a "Favorite" or "Past Search" option for users to do quick searches
* Add the ability for users to search by food type
* Enable an interactive map that displays restaurants and allow users to click to show more information