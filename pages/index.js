import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Head from 'next/head'
import fetch from 'node-fetch'

const getWeatherData = async (latitude, longitude) => {
    let url = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + latitude + '&lon=' + longitude
    let res = await fetch(url)
    return await res.json()
}

const Weather = () => {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [temp, setTemp] = useState(0)
    const [degree, setDegree] = useState('C')
    const [city, setCity] = useState('Unknow')
    const [country, setCountry] = useState('Unknow')
    const [weather, setWeather] = useState('Unknow')
    const [iconUrl, setIconUrl] = useState('')

    const setData = (data) => {
        setLatitude(data.coord.lat)
        setLongitude(data.coord.lon)
        setTemp(Math.round(data.main.temp))
        setDegree('C')
        setCity(data.name || '')
        setCountry(data.sys.country || '')
        setWeather(data.weather[0].main)
        setIconUrl(data.weather[0].icon || '')
    }

    const changeDegree = () => {
        setTemp(degree == 'F' ? Math.round(temp * 9 / 5 + 32) : Math.round((temp - 32) * 5 / 9))
        setDegree(degree == 'C' ? 'F' : 'C')
    }

    const getNewWeather = (e) => {
        e.preventDefault();
        getWeatherData(latitude, longitude)
            .then(data => {
                setData(data)
            })
    }

    const getCurrentWeather = (e) => {
        e.preventDefault();
        window.navigator.geolocation.getCurrentPosition(position => {
            getWeatherData(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    setData(data)
                })
        }, (err) => {
            alert('Cannot get your current location!')
        })
    }

    return (
        <>
            <Head>
                <title>Weather</title>
            </Head>
            <main className={styles.home}>
                <h1>Weather App</h1>
                <div className={styles.main}>
                  <p className={styles.temp}>{temp}&deg;<button onClick={changeDegree} className={styles.degree}>{degree}</button></p>
                  <p className={styles.weather}>{weather}</p>
                  <p><img className={styles.icon} src={iconUrl} /></p>
                  <p className={styles.city}>{city == '' ? 'Unknow' : city}, {country == '' ? 'Unknow' : country}</p>
                </div>
                <form className={styles.form}>
                    <input className={styles.input} type='number' placeholder='latitude' value={latitude} step={0.1} onChange={(e) => setLatitude(e.target.value)} />
                    <input className={styles.input} type='number' placeholder='longitude' value={longitude} step={0.1} onChange={(e) => setLongitude(e.target.value)} /> <br />
                    <input className={styles.submit} type='submit' value='Submit' onClick={getNewWeather} />
                    <button className={styles.submit} onClick={getCurrentWeather}>My location</button>
                </form>
            </main>
        </>
    )
}

export default Weather