import styles from '../styles/Home.module.css'
import React from 'react'
import Head from 'next/head'
import fetch from 'node-fetch'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: 18,
            lon: 0,
            lat: 0,
            degree: 'C',
            city: 'Ha Noi',
            country: 'VN',
            weather: '',
            weatherImgUrl: ''
        }
    }

    component

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let url = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + lat + '&lon=' + lon
            fetch(url).then(res => res.json())
                .then(data => {
                    this.setState({
                        lon: lon,
                        lat: lat,
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        weather: data.weather[0].main,
                        weatherImgUrl: data.weather[0].icon
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>Weather App</title>
                </Head>
                <main className={styles.home}>
                    <h1>Weather App</h1>
                    <p>{this.state.lat}</p>
                    <p>{this.state.lon}</p>
                    <p>{this.state.temperature} {this.state.degree}</p>
                    <p>{this.state.city}, {this.state.country}</p>
                    <p>{this.state.weather}</p>
                    <p><img src={this.state.weatherImgUrl} /></p>
                </main>
            </>
        )
    }
}

export default Home