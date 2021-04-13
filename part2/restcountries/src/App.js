import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

function App() {
  const [coutries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      const countriesData = res.data;
      setCountries(countriesData);
    });
  }, []);

  const filteredCountries = filter
    ? coutries.filter((country) =>
        country.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : coutries;

  const handleNewSearch = (e) => {
    e.preventDefault();
    setFilter(true);
  };

  return (
    <div className="App">
      <form onSubmit={handleNewSearch}>
        <label htmlFor="input">find countries</label>
        <input
          id="input"
          type="text"
          value={newSearch}
          onChange={(e) => setNewSearch(e.target.value)}
        />
        <button type="submit">add</button>
      </form>

      <Countries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
