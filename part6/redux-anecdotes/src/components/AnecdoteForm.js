import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  displayNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewNote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    const newAnecdote = await anecdotesService.createNew(content);
    console.log(newAnecdote);
    dispatch(createAnecdote(newAnecdote));

    dispatch(displayNotification('Succesful created a note '));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
