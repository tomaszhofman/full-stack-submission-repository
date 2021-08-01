import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Country } from './Country';
import { Countries } from './Countries';

export const App = () => {
  const [searchPhrase, setSearchPhrase] = useState();
  const [countries, setCountries] = useState([]);
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState();

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
      .catch((e) => console.log(e));
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();

    if (searchPhrase !== undefined) {
      const filterCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchPhrase.toLowerCase())
      );
      setCountries(filterCountries);
    }
  };

  const handleShowCountry = () => {
    setCountryOpen(!isCountryOpen);
  };

  return (
    <div>
      <label htmlFor="search">find countries</label>
      <input
        name="search"
        type="text"
        value={searchPhrase || ''}
        onChange={(e) => {
          setSearchPhrase(e.target.value);
          handleOnChange(e);
        }}
      />
      <Countries
        countries={countries}
        handleShowCountry={handleShowCountry}
        isCountryOpen={isCountryOpen}
        setActiveCountry={setActiveCountry}
        activeCountry={activeCountry}
      />
    </div>
  );
};

export default App;
