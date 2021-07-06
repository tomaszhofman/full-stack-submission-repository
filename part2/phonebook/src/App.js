import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleFilter = () => {
    let personsCopy = [...persons];
    const filteredPersons = personsCopy.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setPersons(filteredPersons);
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const ifPersonExist = persons.find(
      (person) => newName.toLowerCase() === person.name.toLowerCase()
    );
    if (ifPersonExist) {
      alert(`${newName} is already added to phonebook`);
    }

    const newPersonName = {
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, newPersonName]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        onChange={(e) => {
          setSearch(e.target.value);
          handleFilter();
        }}
        value={search}
      />
      <h2>add a new</h2>

      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
