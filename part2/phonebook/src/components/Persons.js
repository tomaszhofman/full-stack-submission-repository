import React from 'react';
import { deleteObject } from '../services/persons';
import Person from './Person';
const Persons = ({ persons, setPersons, setMessage }) => {
  const handleDeletePerson = (personObject) => {
    if (window.confirm('Do you really want to delete user?')) {
      deleteObject(personObject.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personObject.id));
        })
        .catch((e) => {
          setMessage(
            `Infomrations of ${personObject.name} has already been removed from the server`
          );

          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
              handleDeletePerson={() => handleDeletePerson(person)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Persons;
