function getWeatherOfTheWeek() {    
    return fetch(request).then(response => response.json()) //Le pega a la API.
    .then(weatherInfo => { 
        return weatherInfo.daily     //Devuelve la array de los proximos 8 dias.
    })
    .catch(err => { err = new Error(), console.log(err) })
}

function writeWeeek() {
    getWeatherOfTheWeek()
    .then( week => {
        week.forEach( day => {
            const currentSunrise = new Date(day.sunrise * 1000);
            console.log( `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}` );

            document.getElementById("fecha").innerHTML = `${currentSunrise.getHours()}:${currentSunrise.getMinutes()}`

            const currentSunset = new Date(day.sunset * 1000);
            console.log( `${currentSunset.getHours()}:${currentSunset.getMinutes()}` );
            
            //Temperatura la API te los tira en Kelvin hay que pasarlos a Celsius:
            console.log(`
            Max: ${parseInt(day.temp.max -273.15)}\n
            Min: ${parseInt(day.temp.min -273.15)}
            `)
        })
    })
}
