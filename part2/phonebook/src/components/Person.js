import React from 'react';

const Person = ({ name, number }) => {
  return (
    <li key={name}>
      {name} {number}
    </li>
  );
};

export default Person;
