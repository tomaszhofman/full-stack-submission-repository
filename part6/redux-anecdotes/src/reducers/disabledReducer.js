const dispabledReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_DISABLED':
      return !state;

    default:
      return state;
  }
};

export const changeDisabled = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_DISABLED',
    });

    setTimeout(() => {
      dispatch({
        type: 'SET_DISABLED',
      });
    }, 2000);
  };
};

export default dispabledReducer;
