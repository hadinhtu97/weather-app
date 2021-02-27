import styles from '../styles/Home.module.css'
import React from 'react'
import Head from 'next/head'
import fetch from 'node-fetch'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 19.796,
            longitude: 105.775,
            temp: 18,
            degree: 'C',
            city: 'Thanh Hoa',
            country: 'VN',
            weather: 'Clouds',
            iconUrl: 'https://cdn.freecodecamp.org/weather-icons/04n.png'
        }
        this.setWeatherDataToState = this.setWeatherDataToState.bind(this)
        this.changeDegree = this.changeDegree.bind(this)
        this.newWeather = this.newWeather.bind(this)
        this.getCurrentWeather = this.getCurrentWeather.bind(this)
    }

    componentDidMount() {
        this.getWeatherData(this.state.latitude, this.state.longitude)
            .then(data => {
                this.setWeatherDataToState(data)
            })
    }

    async getWeatherData(latitude, longitude) {
        let url = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + latitude + '&lon=' + longitude
        let res = await fetch(url)
        return await res.json()
    }

    setWeatherDataToState(data) {
        this.setState({
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            temp: Math.round(data.main.temp),
            city: data.name || '',
            country: data.sys.country || '',
            weather: data.weather[0].main,
            iconUrl: data.weather[0].icon,
            degree: 'C'
        })
    }

    changeDegree() {
        this.setState(state => ({
            degree: state.degree == 'C' ? 'F' : 'C',
            temp: state.degree == 'F' ? Math.round(state.temp * 9 / 5 + 32) : Math.round((state.temp - 32) * 5 / 9)
        }))
    }

    newWeather(e) {
        e.preventDefault();
        this.getWeatherData(this.state.latitude, this.state.longitude)
            .then(data => {
                this.setWeatherDataToState(data)
            })
    }

    getCurrentWeather(e) {
        e.preventDefault();
        window.navigator.geolocation.getCurrentPosition(position => {
            this.getWeatherData(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    this.setWeatherDataToState(data)
                })
        }, (err) => {
            alert('Cannot get your current location!')
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>Weather</title>
                </Head>
                <main className={styles.home}>
                    <h1>Weather App</h1>
                    <p className={styles.temp}>{this.state.temp} &deg;<button onClick={this.changeDegree} className={styles.degree}>{this.state.degree}</button></p>
                    <p className={styles.weather}>{this.state.weather}</p>
                    <p className={styles.icon}><img src={this.state.iconUrl} /></p>
                    <p className={styles.city}>{this.state.city == '' ? 'Unknow' : this.state.city} city</p>
                    <p className={styles.country}>{this.state.country == '' ? 'Unknow' : this.state.country} country</p>
                    <form>
                        <input type='number' placeholder='latitude' value={this.state.latitude} step={0.1} onChange={(e) => this.setState({ latitude: e.target.value })} />
                        <input type='number' placeholder='longitude' value={this.state.longitude} step={0.1} onChange={(e) => this.setState({ longitude: e.target.value })} /> <br />
                        <input type='submit' value='Get Weather with latitude and longitude' onClick={this.newWeather} /> <br />
                        or <button onClick={this.getCurrentWeather}>Get Weather in your current location</button>
                    </form>
                </main>
            </>
        )
    }
}

export default Home