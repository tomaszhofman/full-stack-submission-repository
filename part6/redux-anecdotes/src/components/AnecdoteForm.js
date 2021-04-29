import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

import {
  createNotification,
  deleteNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    const content = e.target.anecdote.value;
    e.preventDefault();

    dispatch(createNote(content));

    dispatch(createNotification(` created ${content}`, 2));
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
