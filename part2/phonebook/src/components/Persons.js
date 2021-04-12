import React from 'react';
import Person from './Person';

const Persons = (props) => {
  return (
    <ul>
      {props.contactsToShow.map((person) => (
        <Person key={person.name} {...person} />
      ))}
    </ul>
  );
};

export default Persons;
