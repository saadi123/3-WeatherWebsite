const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&appid=24e6152caa255a3c194e8721310b176f";

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Could not connect to the location services', undefined);
        } else if (body.message) {
            callback('Unable to find location services', undefined);
        } else {
            callback(undefined, 'The weather forecast is '+ body.weather[0].description + ' with max temperature being ' + body.main.temp_max + ' with wind speed of ' + body.wind.speed
            )
        }
    })
}

module.exports = forecast;