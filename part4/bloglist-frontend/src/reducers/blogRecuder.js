import blogService from '../services/blogs';

const initialState = {
  blogs: [],
  selectedBlog: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BLOG INIT':
      return {
        ...state,
        blogs: action.data,
      };

    case 'NEW BLOG':
      return {
        ...state,
        blogs: [...state, action.data],
      };

    case 'UPDATE LIKES':
      return {
        ...state,
        blogs: state.map((el) =>
          el.id === action.data.id ? action.data.response : el
        ),
      };

    case 'DELETE BLOG':
      return {
        ...state,
        blogs: state.filter((el) => el.id !== action.data.id),
      };

    case 'FIND BLOG':
      return {
        ...state,
        selectedBlog: action.data.response,
      };

    default:
      return state;
  }
};

export const inicializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch({
      type: 'BLOG INIT',
      data: blogs,
    });
  };
};

export const addNewBlog = (data) => {
  return async (dispatch) => {
    const result = await blogService.create(data);

    dispatch({
      type: 'NEW BLOG',
      data: result,
    });
  };
};

export const updateLikes = (id) => {
  return async (dispatch) => {
    const response = await blogService.incrementLikes(id);
    console.log(response);

    dispatch({
      type: 'UPDATE LIKES',
      data: { response, id },
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.deleteItem(id);

    dispatch({
      type: 'DELETE BLOG',
      data: { response, id },
    });
  };
};

export const findBlogDetails = (id) => {
  return async (dispatch) => {
    const response = await blogService.getOne(id);

    dispatch({
      type: 'FIND BLOG',
      data: { response },
    });
  };
};

export default blogReducer;
