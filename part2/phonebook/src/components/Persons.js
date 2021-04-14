import React from 'react';
import Person from './Person';

const Persons = (props) => {
  return (
    <ul>
      {props.contactsToShow.map((person) => (
        <Person
          onClick={() => props.handleDeletePerson(person.id)}
          key={person.name}
          {...person}
        />
      ))}
    </ul>
  );
};

export default Persons;
