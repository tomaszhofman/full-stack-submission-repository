import { createStore, combineReducers, applyMiddleware } from 'redux';
import blogReducer from './reducers/blogRecuder';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import notifiactionReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notifiactionReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
