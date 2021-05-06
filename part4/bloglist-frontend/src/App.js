import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewPostForm from './components/NewPostForm';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

import { Switch, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog, inicializeBlog } from './reducers/blogRecuder';
import { setNotification } from './reducers/notificationReducer';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
const initialState = {
  username: '',
  password: '',
};

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, SetUser] = useState(null);
  const [login, setLogin] = useState(initialState);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notifiaction = useSelector((state) => state.notifications);
  console.log(notifiaction);

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(inicializeBlog());
    console.log('test');
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedUserToken');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      SetUser(user);
      blogService.getToken(user.token);
    }
  }, []);

  const handleLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedUserToken');
    SetUser(null);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: login.username,
        password: login.password,
      });

      window.localStorage.setItem('LoggedUserToken', JSON.stringify(user));
      blogService.getToken(user.token);
      SetUser(user);
      setLogin(initialState);
      console.log(user);
    } catch (errorMessage) {
      // setError('wrong username or password');
      // setTimeout(() => {
      //   setError(null);
      // }, 5000);

      dispatch(setNotification('wrong username or password'));
    }
  };

  const addPost = async (newUser) => {
    dispatch(addNewBlog(newUser));
    dispatch(
      setNotification(`a new blog ${newUser.title} by ${newUser.author} added`)
    );

    // setTimeout(() => {
    //   setError(null);
    // }, 5000);
    // setBlogs(blogs.concat(result));
  };

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="username ">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={login.username}
          onChange={handleLogin}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={login.password}
          onChange={handleLogin}
        />
        <button type="submit">login</button>
      </form>
    </>
  );

  const newPostForm = () => (
    <Togglable buttonLabel="create new blog">
      <NewPostForm addPost={addPost} />
    </Togglable>
  );

  if (!user) {
    return loginForm();
  }

  return (
    <div>
      <Notification notification={notifiaction} />

      <div>
        <h2>blogs</h2>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}> logout</button>
        <Switch>
          <Route path="/users/:id">
            <UserDetails />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {newPostForm()}
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  // setBlogs={setBlogs}
                  blogs={blogs}
                />
              ))}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
