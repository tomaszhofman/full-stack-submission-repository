import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (e) => {
    const content = e.target.anecdote.value;
    e.preventDefault();

    dispatch(createNote(content));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
