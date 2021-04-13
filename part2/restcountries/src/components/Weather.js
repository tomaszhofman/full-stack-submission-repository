import React, { useEffect, useState } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_OPENWEATHER_KEY;
console.log(key);

const Weather = (props) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${key}&units=metric`
      )
      .then((res) => setWeather(res.data));
  }, []);

  if (weather === undefined) {
    return <h1>loading</h1>;
  }

  console.log(weather);
  const temp = weather.main.temp;
  const wind = weather.wind.speed;
  const icon = weather.weather[0].icon;

  return (
    <div>
      <h3>Temperature in {props.city}</h3>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />

      <p>temperature: {temp} Celcius</p>
      <p>wind: {wind} mph</p>
    </div>
  );
};

export default Weather;
