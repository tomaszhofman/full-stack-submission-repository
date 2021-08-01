import React from 'react';
import { Country } from '../src/Country';
import { CountryDetails } from './CountryDetails';

export const Countries = ({
  countries,
  handleShowCountry,
  isCountryOpen,
  setActiveCountry,
  activeCountry,
}) => {
  const country = countries[0];
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    console.log(true);
    return (
      <div>
        <CountryDetails {...country} />
      </div>
    );
  }

  return (
    <div>
      {isCountryOpen ? (
        <CountryDetails {...activeCountry} />
      ) : (
        countries.map((country) => (
          <Country
            key={country.name}
            name={country.name}
            handleShowCountry={handleShowCountry}
            onClick={() => {
              setActiveCountry(country);
              handleShowCountry();
            }}
          />
        ))
      )}
    </div>
  );
};
