//Parametros para formar la query
var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var unit = "metric";
var lang = "es";
var part = "";

const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&exclude=${part}&appid=${apiKey}`;

function getCurrentWeather() {    //Re distribuida la forma de llenar datos para hacer un solo llamado 
    return fetch(request).then(response => response.json()) //Le pega a la API.
    .then(weatherInfo => {
        //Current Hour
        document.getElementById("currentHour").innerHTML =  new Date().toString().substr(0,21); //Se acorta antes por estetica.

        //Get City
        const tz = weatherInfo.timezone.split("/");
        document.getElementById("city").innerHTML = tz[tz.length-1];


        //weather icon  
        const icon = weatherInfo.current.weather[0].icon;
        const url = ` https://openweathermap.org/img/wn/${icon}@4x.png`;
        document.getElementById("weatherIcon").innerHTML = `<img src=${url}>`;

        //Current Temperature
        const ct = parseInt(weatherInfo.current.temp);        
        document.getElementById("temperatura").innerHTML = ct;

    
        return weatherInfo.daily[0] //Devuelve dia actual.
    })
    .catch(err => { err = new Error(), console.log(err) })
}


function writeCurrentWeather() {
    getCurrentWeather()
    .then( day => {
        //Min & max
        document.getElementById("max").innerHTML = `${parseInt(day.temp.max)}°C↑`;
        document.getElementById("min").innerHTML = `${parseInt(day.temp.min)}°C↓`;


        ///  First Roww  //
        //Humidity
        document.getElementById("humdityPercentage").innerHTML = `${day.humidity}%`;
        //Pressure
        document.getElementById("pressureMbar").innerHTML = `${day.pressure}mBar`;
        //Wind Speed 
        document.getElementById("windSpeed").innerHTML = `${parseInt(day.wind_speed)}km/h`;
        
        
        ///  Second Row  ///
        //Sunset
        const currentSunset = new Date(day.sunset * 1000);
        document.getElementById("sunsetHour").innerHTML = `${currentSunset.getHours()}:${currentSunset.getMinutes()}`;
        
        //Sunrise
        const currentSunrise = new Date(day.sunrise * 1000);
        document.getElementById("sunriseHour").innerHTML = `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}`;
        
        //Daytime
        const currentDaytime= new Date(day.dt * 1000);
        document.getElementById("dayTimeHour").innerHTML = `${currentDaytime.getHours()}`;
    })
}

writeCurrentWeather() 