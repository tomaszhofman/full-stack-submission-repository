import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import axios from 'axios';

import servicePerson from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [sucessMessage, setSucessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const headerStyle = {
    color: 'red',
  };

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
        .then((returnedNote) => console.log(returnedNote))
        .catch((error) => {
          setErrorMessage(`This note was already removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
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
          )
          .catch((error) => {
            setErrorMessage(`Information has been removed from server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      servicePerson.create(newPersonObject).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setSucessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSucessMessage(null);
        }, 4000);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  return (
    <div>
      <h2 style={headerStyle}>Phonebook</h2>
      <Notification message={sucessMessage ? sucessMessage : errorMessage} />

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
