import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import { createAnecdote, incrementLike } from './reducers/anecdoteReducer';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
