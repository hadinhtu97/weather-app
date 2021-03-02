import getWeatherData from '../../modules/weather'

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.query.lat == undefined || req.query.lon == undefined) {
                res.send('Require lat and lon!')
            } else {
                try {
                    let data = await getWeatherData(req.query.lat, req.query.lon);
                    res.json(data)
                } catch (err) {
                    res.send('Can not get weather data. Try again later!')
                }
            }
            break
        default:
            res.status(404).end()
            break;
    }
}