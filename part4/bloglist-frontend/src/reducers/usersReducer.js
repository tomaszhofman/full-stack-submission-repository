import usersServices from '../services/users';

const initialState = {
  users: [],
  userBlogs: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT USER':
      return {
        ...state,
        users: action.data,
      };

    case 'FIND USER BLOGS':
      return {
        ...state,
        userBlogs: action.data.response,
      };

    default:
      return state;
  }
};

export const inicalizeUsers = () => {
  return async (dispatch) => {
    const response = await usersServices.getAll();

    dispatch({
      type: 'INIT USER',
      data: response,
    });
  };
};

export const findUserBlogs = (id) => {
  return async (dispatch) => {
    const response = await usersServices.getOne(id);

    console.log(response);
    dispatch({
      type: 'FIND USER BLOGS',
      data: { id, response: response },
    });
  };
};

export default userReducer;
