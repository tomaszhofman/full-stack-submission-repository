import React from 'react';
import Weather from '../components/Weather';

const CountryDetails = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.name}</h1>

      <p> capital {props.capital}</p>
      <p>popultaion {props.population}</p>

      <h2>languages</h2>
      <ul>
        {props.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <div>
        <img src={props.flag} height="250" width="350" />
      </div>

      <Weather city={props.capital} />
    </div>
  );
};

export default CountryDetails;
