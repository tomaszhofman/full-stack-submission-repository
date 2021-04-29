const notificationReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'DELETE_NOTIFICATION':
      return '';

    default:
      return state;
  }
};

export const createNotification = (data, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data,
    });

    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, time * 1000);
  };
};

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
    data: null,
  };
};

export default notificationReducer;
