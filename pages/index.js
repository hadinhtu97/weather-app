import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import GoogleMap from 'google-map-react'
import getWeatherData from '../modules/weather'


const Weather = () => {
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [temp, setTemp] = useState(0)
    const [feelLike, setFeelLike] = useState(0)
    const [degree, setDegree] = useState('C')
    const [pressure, setPressure] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [visibility, setVisibility] = useState(0)
    const [wind, setWind] = useState(0)
    const [description, setDescription] = useState('')
    const [iconURL, setIconURL] = useState('')
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')
    const [city, setCity] = useState('Unknow')
    const [country, setCountry] = useState('Unknow')

    const setData = (data) => {
        setLat(data.lat)
        setLon(data.lon)
        setTemp(data.temp)
        setDegree('C')
        setFeelLike(data.feelLike)
        setPressure(data.pressure)
        setHumidity(data.humidity)
        setVisibility(data.visibility)
        setWind(data.wind)
        setDescription(data.description)
        setIconURL(data.iconURL)
        setSunrise(data.sunrise)
        setSunset(data.sunset)
        setCity(data.city)
        setCountry(data.country)
    }

    useEffect(() => {
        getWeatherData(35, 139)
            .then(data => {
                setData(data)
            })
            .catch(err => alert('Can not get weather data!'))
    }, [])

    const changeDegree = () => {
        setTemp(degree == 'C' ? Math.round(temp * 9 / 5 + 32) : Math.round((temp - 32) * 5 / 9))
        setFeelLike(degree == 'C' ? Math.round(feelLike * 9 / 5 + 32) : Math.round((feelLike - 32) * 5 / 9))
        setDegree(degree == 'C' ? 'F' : 'C')
    }

    const getWeather = (e) => {
        e.preventDefault();
        getWeatherData(lat, lon)
            .then(data => {
                setData(data)
            })
            .catch(err => alert('Can not get weather data!'))
    }

    const getWeatherInCurrentLocation = (e) => {
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
                <title>Weather App</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Weather App</h1>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.map}>
                            <GoogleMap center={{ lat: lat, lng: lon }} zoom={6} bootstrapURLKeys={{ key: 'AIzaSyAsBC7STkYS2lz0TRcLxb_8xTD08UC7an0' }} />
                        </div>
                        <form className={styles.form}>
                            <input className={styles.input} type='number' placeholder='latitude' value={lat} step={0.1} onChange={(e) => setLat(e.target.value)} />
                            <input className={styles.input} type='number' placeholder='longitude' value={lon} step={0.1} onChange={(e) => setLon(e.target.value)} />
                            <input className={styles.submit} type='submit' value='Submit' onClick={getWeather} />
                            <button className={styles.submit} onClick={getWeatherInCurrentLocation}>My location</button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.location}>{city}, {country}</div>
                        <div className={styles.weather}>
                            <div className={styles.temp}>
                                {temp} &deg; <button className={styles.degree} onClick={changeDegree}>{degree}</button>
                            </div>
                            <div className={styles.sky}>
                                <div className={styles.description}>{description}</div>
                                <div className={styles.icom}><img src={iconURL} /></div>
                            </div>
                        </div>
                        <div className={styles.information}>feels like <span className={styles.color}>{feelLike}</span> &deg; {degree}, visibility <span className={styles.color}>{visibility}</span> m</div>
                        <div className={styles.information}>sunrise <span className={styles.color}>{sunrise}</span>, sunset <span className={styles.color}>{sunset}</span></div>
                        <div className={styles.information}>pressure <span className={styles.color}>{pressure}</span> hPa</div>
                        <div className={styles.information}>humidity <span className={styles.color}>{humidity}</span> %</div>
                        <div className={styles.information}>wind speed <span className={styles.color}>{wind}</span> m/s</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Weather