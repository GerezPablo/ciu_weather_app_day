var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var lang = "sp, es"
var part = "";

const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=${lang}&exclude=${part},hourly&appid=${apiKey}`;

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
        console.log(tz);
        document.getElementById("city").innerHTML = tz[tz.length-1];
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
        
        //Sunrirse
        const currentSunrise = new Date(day.sunrise * 1000);
        console.log( `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}` );

        //Sunset
        document.getElementById("fecha").innerHTML = `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}`

        const currentSunset = new Date(day.sunset * 1000);
        console.log( `${currentSunset.getHours()}:${currentSunset.getMinutes()}` );
        
        //Temperatura la API te los tira en Kelvin hay que pasarlos a Celsius:
        console.log(`
        Max: ${parseInt(day.temp.max -273.15)}\n
        Min: ${parseInt(day.temp.min -273.15)}
        `)
    })
}

//http://openweathermap.org/img/wn/10d@2x.png HABEMUS ICONS

writeCurrentWeather() 