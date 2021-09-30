import React, { useEffect, useState } from 'react';

export const useCountries = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if (!name) {
      return;
    }
    const fetchCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );
      const data = await response.json();
      setCountry(data);
    };

    fetchCountry();
  }, [name]);
  return country;
};
