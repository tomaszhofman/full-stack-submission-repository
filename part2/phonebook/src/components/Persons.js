import React from 'react';
import { deleteObject } from '../services/notes';
import Person from './Person';
const Persons = ({ persons, setPersons }) => {
  const handleDeletePerson = (id) => {
    if (window.confirm('Do you really want to delete user?')) {
      deleteObject(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((e) => {
          alert(`the phone nubmer ${id} was already deleted from server `);
        });
    }
  };

  return (
    <div>
      {persons.map((person, i) => (
        <div key={person.name}>
          <div>
            <Person
              {...person}
              handleDeletePerson={() => handleDeletePerson(person.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Persons;
