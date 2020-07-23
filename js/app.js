var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var unit = "metric";
var lang = "es";
var part = "";

const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&exclude=${part}&appid=${apiKey}`;

function getCurrentWeather() {    
    return fetch(request).then(response => response.json()) //Le pega a la API.
    .then(weatherInfo => {
        return weatherInfo.daily[0] //Devuelve dia actual.
    })
    .catch(err => { err = new Error(), console.log(err) })
}

function getCity() {
    fetch(request).then(response => response.json())
        .then(weatherInfo => { 
        const tz = weatherInfo.timezone.split("/");
        document.getElementById("city").innerHTML = tz[tz.length-1];
    })
}

function getCurrentTemp() {
    fetch(request).then(response => response.json())
        .then(weatherInfo => { 
        const ct = parseInt(weatherInfo.current.temp);        
        document.getElementById("temperatura").innerHTML = ct;
    })
}

function writeCurrentWeather() {
    getCurrentWeather()
    .then( day => {
        //DayTime
        const dayTime = new Date(day.dt * 1000);
        document.getElementById("dayTime").innerHTML =  dayTime.toString().substr(0,21);;
        
        //city
        getCity()

        //weather icon  
        const icon = day.weather[0].icon;
        const url = ` http://openweathermap.org/img/wn/${icon}@4x.png`;
        document.getElementById("weatherIcon").innerHTML = `<img src=${url}>`;
        
        //Sunrirse
        const currentSunrise = new Date(day.sunrise * 1000);
        console.log( `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}` );

        //Sunset
        document.getElementById("fecha").innerHTML = `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}`


        //Temps 
        // =>Current
        getCurrentTemp();

        const currentSunset = new Date(day.sunset * 1000);
        console.log( `${currentSunset.getHours()}:${currentSunset.getMinutes()}` );
        
        
        console.log(`
        Max: ${parseInt(day.temp.max)}\n
        Min: ${parseInt(day.temp.min)}
        `)
    })
}
/*
{"lat":-34.57,"lon":-58.62,"timezone":"America/Argentina/Buenos_Aires","timezone_offset":-10800,
"current":{"dt":1595466585,"sunrise":1595415296,"sunset":1595451997,"temp":287.65,"feels_like":286.56,"pressure":1011,
"humidity":87,"dew_point":285.51,"uvi":2.84,"clouds":90,"visibility":5000,"wind_speed":2.6,"wind_deg":230,
"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}]}}
*/

//http://openweathermap.org/img/wn/10d@2x.png HABEMUS ICONS

writeCurrentWeather() 