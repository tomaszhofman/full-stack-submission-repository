import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { ALL_AUTHORS } from './Authors';
import Select from 'react-select';

const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    console.log(selectedOption.label);
    e.preventDefault();
    editAuthor({
      variables: {
        name: selectedOption.label,
        setBornTo: Number(born),
      },
    });
  };

  const convertToLabel = authors.map((author) => ({
    label: author.name,
    value: author.name.toLowerCase().split(' ').join(' '),
  }));

  console.log(convertToLabel);

  return (
    <div>
      <h1>Set birthYear</h1>

      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={convertToLabel}
        />
        <label htmlFor='born'>born</label>
        <input
          name='born'
          type='text'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
