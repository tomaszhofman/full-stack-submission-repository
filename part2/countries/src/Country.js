import React from 'react';

export const Country = ({ name, handleShowCountry, onClick }) => {
  return (
    <div>
      {name}
      <button onClick={onClick}>show</button>
    </div>
  );
};
