import AnecdoteService from '../services/anecdotes';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT_VOTE': {
      const id = action.data.id;
      const newAnecdote = action.data.updatedVotes;
      // const anecdoteToFind = state.find((el) => el.id === id);
      // const newAnecdote = {
      //   ...anecdoteToFind,
      //   votes: anecdoteToFind.votes + 1,
      // };

      return state.map((el) => (el.id !== id ? el : newAnecdote));
    }

    case 'ADD_NOTE':
      return [...state, action.data];

    case 'INIT':
      return action.data;

    default:
      return state;
  }
};

export const initAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await AnecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export const vote = (id) => {
  return async (dispatch) => {
    const updatedVotes = await AnecdoteService.incrementLikes(id);
    dispatch({
      type: 'INCREMENT_VOTE',
      data: { updatedVotes, id },
    });
  };
};

export const createNote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await AnecdoteService.createNew(data);
    dispatch({
      type: 'ADD_NOTE',
      data: newAnecdote,
    });
  };
};

export default reducer;
