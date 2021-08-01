import axios from 'axios';
import React, { useEffect, useState } from 'react';

const WEATHER_API = process.env.REACT_APP_API_WEATHER_KEY;

export const CountryDetails = ({
  name,
  population,
  capital,
  languages,
  flag,
  latlng,
}) => {
  const [weatherDetails, setWeatherDetails] = useState({});

  const lat = latlng[0];
  const lng = latlng[1];

  console.log(weatherDetails);

  useEffect(() => {
    axios
      .get(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHER_API}`
      )
      .then((response) => setWeatherDetails(response.data.data[0]))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <h1>{name}</h1>
      <br />
      <p>capital {capital}</p>
      <p>population {population}</p>
      <ul>
        {languages.map((language) => (
          <li kye={language.name}>{language.name}</li>
        ))}
      </ul>
      <br />
      <img style={{ width: '200px' }} src={flag} alt={name} />

      <h2>Wetaher in {name}</h2>
      <p>temperature {weatherDetails.app_temp} </p>

      <p>
        wind {weatherDetails.wind_spd} {weatherDetails.wind_cdir}{' '}
      </p>
    </div>
  );
};
