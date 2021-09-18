import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedUser');
      setUser(null);
    } catch (e) {
      setErrorMessage('User already logged out');
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const handleAddBlog = async (blogObject) => {
    console.log(blogObject, 'APPP');
    const createdBlog = await blogService.create(blogObject, user.token);

    setBlogs([...blogs, createdBlog]);
    setErrorMessage(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  if (user === null) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <h2>Log into application</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label htmlFor='username'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <h2>blogs</h2>
      <br />
      <p>{`${user.username} has logged in`}</p>
      <button onClick={handleLogout}>logout</button>
      <br />
      <h2>Create new</h2>
      <Togglable label='create new blog'>
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
