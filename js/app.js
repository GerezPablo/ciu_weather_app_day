var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var part = "daily";

const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part},hourly&appid=${apiKey}`;

function getWeather() {    
    return fetch(request)
    .then(response => response.json() )
    .catch(err => { err = new Error(), console.log(err) })
    .then(weatherInfo => { return weatherInfo.current })
}


function writeWeather() {
    getWeather()
    .then(current => {
        document.getElementById("humidity").innerHTML = current.humidity
        document.getElementById("pressure").innerHTML = current.pressure
        document.getElementById("wind_speed").innerHTML = current.wind_speed 
        document.getElementById("sunrise").innerHTML = current.sunrise
        document.getElementById("sunset").innerHTML = current.sunset
        document.getElementById("dt").innerHTML = current.dt      
    })
}


/*
{"lat":-34.57,"lon":-58.62,"timezone":"America/Argentina/Buenos_Aires","timezone_offset":-10800,
"current":{"dt":1595466585,"sunrise":1595415296,"sunset":1595451997,"temp":287.65,"feels_like":286.56,"pressure":1011,
"humidity":87,"dew_point":285.51,"uvi":2.84,"clouds":90,"visibility":5000,"wind_speed":2.6,"wind_deg":230,
"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}]}}
*/








