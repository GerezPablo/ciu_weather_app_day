//Parametros para formar la query
var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var unit = "metric";
var lang = "es";
var part = "";
var weeklyReport = [];
const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&exclude=${part}&appid=${apiKey}`;


function getCurrentWeather() {  
    return fetch(request).then(response => response.json()) //Le pega a la API.
    .then(weatherInfo => {        
       var today = new Date() 
    
       //Current Hour
        document.getElementById("currentHour").innerHTML =  today.toString().substr(0,21);
    
        //Get City
        document.getElementById("city").innerHTML = "Villa Tesei"; 

        //weather icon  
        const icon = weatherInfo.current.weather[0].icon;
        const url = ` https://openweathermap.org/img/wn/${icon}@4x.png`;
        document.getElementById("weatherIcon").innerHTML = `<img src=${url}>`;
        document.getElementById("weatherTittle").innerHTML = weatherInfo.current.weather[0].main;

        //Current Temperature
        const ct = parseInt(weatherInfo.current.temp);        
        document.getElementById("temperatura").innerHTML = ct;

        //Min & max
        document.getElementById("max").innerHTML = `${parseInt(weatherInfo.daily[0].temp.max)}°C↑`;
        document.getElementById("min").innerHTML = `${parseInt(weatherInfo.daily[0].temp.min)}°C↓`;

        //Next days 
        const tomorrow = new Date(today);
        for ( i = 1; i <= 4; i ++) {
            const icon = weatherInfo.daily[i].weather[0].icon;
            const url = ` https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById(`weatherIcon${i}`).innerHTML = `<img src=${url}>`;
            document.getElementById(`max${i}`).innerHTML = `${parseInt(weatherInfo.daily[i].temp.max)}°C↑`;
            document.getElementById(`min${i}`).innerHTML = `${parseInt(weatherInfo.daily[i].temp.min)}°C↓`;
            tomorrow.setDate(today.getDate() + i);
            document.getElementById(`currentHour${i}`).innerHTML = `
                ${tomorrow.toString().substr(0,3)}, ${tomorrow.toString().substr(7,3)}`
        }

        return weatherInfo.daily[0] //Devuelve dia actual.

    })
    .catch(err => { err = new Error(), console.log(err) })
}


function writeCurrentWeather() {
    getCurrentWeather()
    .then( day => {
    ///  First Roww  ///    
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