import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { vote } from '../reducers/anecdoteReducer';

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
