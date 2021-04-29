import React, { useEffect } from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/Anecdotes';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';

import { initAnecdote } from '../src/reducers/anecdoteReducer';

import AnecdoteService from '../src/services/anecdotes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdote());
  }, []);
  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <Anecdotes />
    </div>
  );
};

export default App;
