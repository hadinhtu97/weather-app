import fetch from 'node-fetch'

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.query.latitude == undefined || req.query.longitude == undefined) {
                res.send('Require latitude and longitude!')
            } else {
                let url = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + req.query.latitude + '&lon=' + req.query.longitude
                let responsive = await fetch(url)
                let data = await responsive.json()
                res.json({
                    latitude: data.coord.lat,
                    longitude: data.coord.lon,
                    city: data.name || '',
                    country: data.sys.country || '',
                    temperature: data.main.temp,
                    weather: data.weather[0].main,
                    weatherIconUrl: data.weather[0].icon
                })
            }
            break
        default:
            res.status(404).end()
            break;
    }
}