import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import axios from 'axios';

import servicePerson from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    servicePerson.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const contactsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
    : persons;

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(true);
  };

  const handleDeletePerson = (id) => {
    // const findPerson = persons.find((person) => person.id === id);
    const findPerson = persons.find((person) => person.id === id);
    const personName = findPerson.name;
    console.log(personName);
    if (window.confirm(`Delete ${personName}?`)) {
      servicePerson
        .deletePerson(id)
        .then((returnedNote) => console.log(returnedNote));
      setPersons(persons.filter((person) => person.id !== id));
    }
    return;
  };

  const handleNewPerson = (e) => {
    e.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };
    const checkIfNameExists = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (checkIfNameExists.length > 0) {
      console.log(checkIfNameExists);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const findPerson = checkIfNameExists[0];
        const id = findPerson.id;
        const newPersonNumber = { ...findPerson, number: newNumber };
        servicePerson
          .update(id, newPersonNumber)
          .then((returnedNote) =>
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedNote
              )
            )
          );
      }
    } else {
      servicePerson.create(newPersonObject).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearch={handleSearch}
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
      <h2>add a new</h2>
      <Form
        handleNewPerson={handleNewPerson}
        setNewName={(e) => setNewName(e.target.value)}
        newName={newName}
        newNumber={newNumber}
        setNewNumber={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        handleDeletePerson={handleDeletePerson}
        contactsToShow={contactsToShow}
      />
    </div>
  );
};

export default App;
