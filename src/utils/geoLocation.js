const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmloYWxtaWUiLCJhIjoiY2p1eHU0a3NoMG1ldzQzbWxjZm5md2FxdiJ9.zTt7nuQWLPGMDIDkU-rXlA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Cannot connect to....', undefined)
        } else if (body.features.length === 0) {
            callback('The given location is not found', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode