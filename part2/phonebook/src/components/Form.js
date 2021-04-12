import React from 'react';

const Form = (props) => {
  return (
    <form onSubmit={props.handleNewPerson}>
      <div>
        name:
        <input onChange={props.setNewName} value={props.newName} />
      </div>
      <div>
        number:
        <input onChange={props.setNewNumber} value={props.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
