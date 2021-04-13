import React, { useState } from 'react';
import Country from '../components/Country';
import CountryDetails from './CountryDetails';

const Countries = (props) => {
  const [selectCountry, setSelectCountry] = useState();

  const handleShowCountry = (i) => {
    setSelectCountry(props.filteredCountries[i]);
  };

  if (props.filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (props.filteredCountries.length === 1) {
    console.log(props);
    return (
      <ul>
        {props.filteredCountries.map((country) => (
          <CountryDetails {...country} />
        ))}
      </ul>
    );
  }

  if (selectCountry) {
    return (
      <ul>
        <CountryDetails {...selectCountry} />
      </ul>
    );
  }
  return (
    <ul>
      {props.filteredCountries.map((country, i) => (
        <Country {...country} handleShowCountry={() => handleShowCountry(i)} />
      ))}
    </ul>
  );
};

export default Countries;
