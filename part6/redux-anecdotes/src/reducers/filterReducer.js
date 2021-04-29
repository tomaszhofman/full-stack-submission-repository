import { initialState } from '../reducers/anecdoteReducer';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH': {
      const searchPhrase = action.data.content;
      const copyState = [...state];
      const newSearch = copyState.filter((a) =>
        a.content.toLowerCase().includes(searchPhrase.toLowerCase())
      );

      return newSearch;
    }

    default:
      return state;
  }
};

export const searchFilter = (content) => {
  console.log(content);
  return {
    type: 'SEARCH',
    data: {
      content,
    },
  };
};

export default filterReducer;
