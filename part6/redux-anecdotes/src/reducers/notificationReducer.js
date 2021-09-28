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

export const displayNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    });

    const timer = setTimeout(() => {
      dispatch(removeNotification());

      clearTimeout(timer);
    }, time * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default reducer;
