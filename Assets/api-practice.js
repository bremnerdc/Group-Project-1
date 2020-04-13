const GOOGLE_API_KEY = 'AIzaSyAuAw09DnunxYW9E9SjcKvYanUYhWcOdLA';




var url = reverseGeoLocationUrl(70, -90);

console.log(url)




function reverseGeoLocationUrl(lat, lon){
    const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?'
    const query = 'latlng=' + lat + ',' + lon
    const key = '&key=' + GOOGLE_API_KEY;

    return baseURL + query + key;
}