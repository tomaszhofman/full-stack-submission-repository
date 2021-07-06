import React from 'react';
import Person from './Person';
const Persons = ({ persons }) => {
  console.log(persons);

  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          <div>
            <Person {...person} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Persons;
