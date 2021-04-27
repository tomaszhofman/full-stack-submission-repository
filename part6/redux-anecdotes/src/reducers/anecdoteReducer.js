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

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_VOTE': {
      const id = action.data.id;
      const anecdoteToFind = state.find((el) => el.id === id);
      const newAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1,
      };

      return state.map((el) => (el.id !== id ? el : newAnecdote));
    }

    case 'ADD_NOTE':
      return [...state, action.data];

    default:
      return state;
  }
};

export const vote = (id) => {
  return {
    type: 'INCREMENT_VOTE',
    data: {
      id: id,
    },
  };
};

export const createNote = (content) => {
  return {
    type: 'ADD_NOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export default reducer;
