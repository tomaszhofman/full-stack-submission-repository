import React from 'react';

const PersonForm = ({
  newName,
  newNumber,
  handleAddPerson,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name:
        <input
          name="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:
        <input
          name="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
