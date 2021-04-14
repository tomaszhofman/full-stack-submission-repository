import React from 'react';

const Person = ({ name, number, onClick }) => {
  return (
    <li key={name}>
      {name} {number} <button onClick={onClick}>delete</button>
    </li>
  );
};

export default Person;
