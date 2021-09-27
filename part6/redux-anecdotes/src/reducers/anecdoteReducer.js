const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTES':
      return action.data;

    case 'CREATE_ANECDOTE':
      return state.concat(action.payload);

    case 'INCREMENT_LIKE':
      const stateCopy = [...state];
      const findNote = stateCopy.find((i) => i.id === action.payload);
      const newAnecdote = {
        ...findNote,
        votes: findNote.votes + 1,
      };
      return state.map((i) => (i.id === action.payload ? newAnecdote : i));

    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    payload: anecdote,
  };
};

export const incrementLike = (id) => {
  return {
    type: 'INCREMENT_LIKE',
    payload: id,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'CREATE_ANECDOTES',
    data: anecdotes,
  };
};

export default reducer;
