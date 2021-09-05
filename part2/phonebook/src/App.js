import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { create, getAll, update } from './services/notes';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  console.log(persons);

  const handleUpdatePhoneNumber = (personObject) => {
    const newPhoneNumber = { ...personObject, number: newNumber };

    console.log(personObject, 'test');

    console.log(newPhoneNumber);

    update(personObject.id, newPhoneNumber).then((response) => {
      setPersons(
        persons.map((person) =>
          person.id === personObject.id ? response : person
        )
      );
      setMessage(`${personObject.number} was changed to ${newNumber} `);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  useEffect(() => {
    getAll()
      .then((response) => setPersons(response))
      .catch((e) => console.log(e));
  }, []);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleUpdatePhoneNumber(ifPersonExist);
      }
    } else {
      const newPersonName = {
        name: newName,
        number: newNumber,
      };

      console.log(newPersonName);

      create(newPersonName).then((response) => {
        setPersons([...persons, response]);
        setNewName('');
        setMessage(`${response.name} was added `);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <Notification message={message} />
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

      <Persons
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
