import anecdotesService from '../services/anecdotes';

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
      // console.log(action);
      // const stateCopy = [...state];
      // const findNote = stateCopy.find((i) => i.id === action.payload);
      // const newAnecdote = {
      //   ...findNote,
      //   votes: findNote.votes + 1,
      // };
      return state.map((i) =>
        i.id === action.payload.id ? action.payload.response : i
      );

    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      payload: newAnecdote,
    });
  };
};

export const incrementLike = (id) => {
  return async (dispatch) => {
    const response = await anecdotesService.incrementLikes(id);
    dispatch({
      type: 'INCREMENT_LIKE',
      payload: { response, id },
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();

    dispatch({
      type: 'CREATE_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
