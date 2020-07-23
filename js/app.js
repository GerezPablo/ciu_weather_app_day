var lat = -34.5708;
var lon = -58.6243;
var apiKey = "834075ea43292b8f4f1b3021724ad698";
var part = "currrent";

const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part},hourly&appid=${apiKey}`;

function getWeather() {    
    fetch(request)
    .then(response => response.json())
    .then(json => {
        document.getElementById("xd").innerHTML = JSON.stringify(json)
        console.log(json)   
    })
    .catch(err => {
        err = new Error(),
        console.log(err)
    });
}

