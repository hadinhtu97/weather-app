import fetch from 'node-fetch'

const getWeatherData = async (lat, lon) => {
    let url = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + lat + '&lon=' + lon;
    let res = await fetch(url)
    let data = await res.json()
    return {
        lat: data.coord.lat,
        lon: data.coord.lon,
        temp: Math.round(data.main.temp),
        feelLike: Math.round(data.main.feels_like || data.main.temp),
        pressure: data.main.pressure || '',
        humidity: data.main.humidity || '',
        visibility: data.visibility || '',
        wind: data.wind.speed || '',
        description: data.weather[0].main || '',
        iconURL: data.weather[0].icon || '',
        sunrise: convertUnixToTime(data.sys.sunrise) || '',
        sunset: convertUnixToTime(data.sys.sunset) || '',
        city: data.name || 'Unknow',
        country: data.sys.country || 'Unknow',
    }
}

const convertUnixToTime = (number) => {
    let date = new Date(number * 1000);
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hour + ':' + minute
}

export default getWeatherData