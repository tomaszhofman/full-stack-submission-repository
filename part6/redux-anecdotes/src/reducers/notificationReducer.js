const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action);
      console.log(state);
      return action.payload;

    case 'CLEAR_NOTIFICATION':
      return '';

    default:
      return state;
  }
};

export const displayNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: message,
  };
};

export const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default reducer;
