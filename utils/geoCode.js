const request = require('request');

const geoCode = (address, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieGFocmFtIiwiYSI6ImNqejE3MndreTBpZmUzYmxuMWp3NGl2bWUifQ.UXyNaEbxBs6s7_rrPs90Qg&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack(error, undefined)
        } else if (body.message) {
            callBack("Please Enter Right Location And Right Configuration...", undefined)
        }
        else if (!body.features.length) {
            callBack("Please Enter right location...", undefined)
        } else {
            callBack(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode