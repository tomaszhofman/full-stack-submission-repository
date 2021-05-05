const notifiactionReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET NOTIFICATION',
      data: content,
    });

    setTimeout(() => {
      dispatch({
        type: 'SET NOTIFICATION',
        data: '',
      });
    }, 2000);
  };
};

export default notifiactionReducer;
