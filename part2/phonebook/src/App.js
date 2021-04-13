import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/persons').then((res) => {
      const persons = res.data;
      setPersons(persons);
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
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPersonObject));
      setNewName('');
      setNewNumber('');
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
      <Persons contactsToShow={contactsToShow} />
    </div>
  );
};

export default App;
