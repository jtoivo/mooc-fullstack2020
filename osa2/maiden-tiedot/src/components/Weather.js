import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&units=metric&appid=${apiKey}`

  useEffect(() => {
    axios.get(url).then(response => setWeather(response.data))
  }, [url])

  if (weather.length === 0) {
    return <div></div>
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <img
          alt='weather'
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        />
        <p>Temperature {weather.main.temp} C</p>
        <p>
          Wind speed {weather.wind.speed} m/s, direction {weather.wind.deg}{' '}
          degrees
        </p>
      </div>
    )
  }
}

export default Weather
