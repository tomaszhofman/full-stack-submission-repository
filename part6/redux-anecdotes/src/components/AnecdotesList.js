import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { incrementLike } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes.sort((a, b) => b.votes - a.votes);
    } else
      return anecdotes.filter((i) =>
        i.content.toLowerCase().includes(filter.toLowerCase())
      );
  });

  const vote = (content, id) => {
    dispatch(incrementLike(id));
    dispatch(displayNotification(`you voted ${content} `, 3));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.content, anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
