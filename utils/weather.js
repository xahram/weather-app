const request = require('request');

const weather = (long, lat, callBack) => {
    const url = `https://api.darksky.net/forecast/930ba6e1b2bbcec807f95c9bd87d58c8/${long},${lat}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack("Check Your internet Settings", undefined);
        } else if (body.error) {
            callBack("Wrong Coordinates Put together...", undefined)
        } else {
            callBack(undefined, {
                currentTemperature: body.currently.temperature,
                rain: body.currently.precipProbability,
                forecast: body.daily.data[0].summary
            })
        }
    })

}

module.exports = weather
