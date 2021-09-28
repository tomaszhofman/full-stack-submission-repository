import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  displayNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addNewNote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    // dispatch(createAnecdote(newAnecdote));
    props.createAnecdote(content);

    // dispatch(displayNotification('Succesful created a note '));
    props.displayNotification('Succesful created a note ', 5);
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  createAnecdote,
  displayNotification,
  removeNotification,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
