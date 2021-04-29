import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Anecdote from './Anecdote';
import { vote } from '../reducers/anecdoteReducer';

import { connect } from 'react-redux';

import {
  createNotification,
  deleteNotification,
} from '../reducers/notificationReducer';

import { changeDisabled } from '../reducers/disabledReducer';

const Anecdotes = (props) => {
  const handleVote = (anecdote) => {
    // dispatch(vote(anecdote.id));
    props.vote(anecdote.id);
    // dispatch(createNotification(` voted ${anecdote.content}`, 2));
    props.createNotification(` voted ${anecdote.content}`, 2);
    dispatch(changeDisabled());
  };
  // const anecdotes = useSelector((state) =>
  //   state.anecdotes.sort((a, b) => b.votes - a.votes)
  // );

  // const filterd = useSelector((state) => state.filter);
  // const dispatch = useDispatch();
  const disabled = useSelector((state) => state.disabled);
  const dispatch = useDispatch();
  console.log(disabled);

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => handleVote(anecdote)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const sorted = state.anecdotes.sort((a, b) => b.votes - a.votes);
  return {
    anecdotes: sorted,
  };
};

const mapDispatchToProps = {
  vote,
  createNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes);
