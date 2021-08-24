import React from 'react';

const Person = ({ name, number, handleDeletePerson }) => {
  return (
    <div>
      {name}
      {number}
      <button onClick={handleDeletePerson}>delete</button>
    </div>
  );
};

export default Person;
