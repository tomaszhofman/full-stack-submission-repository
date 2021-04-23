import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
const initialState = {
  username: '',
  password: '',
};

const initialStateBlog = {
  title: '',
  author: '',
  url: '',
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, SetUser] = useState(null);
  const [login, setLogin] = useState(initialState);
  const [post, setNewPost] = useState(initialStateBlog);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      setError('wrong username or password');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleNewPostInput = (e) => {
    setNewPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewPostForm = async (e) => {
    e.preventDefault();

    const newUser = {
      title: post.title,
      author: post.author,
      url: post.title,
    };

    const result = await blogService.create(newUser);
    setError(`a new blog ${newUser.title} by ${newUser.author} added`);

    setTimeout(() => {
      setError(null);
    }, 5000);
    setBlogs(blogs.concat(result));
    setNewPost(initialStateBlog);
  };
  const newPostForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewPostForm}>
        <label htmlFor="title ">title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={post.title}
          onChange={handleNewPostInput}
        />
        <label htmlFor="author">author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={post.author}
          onChange={handleNewPostInput}
        />
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          id="url"
          value={post.url}
          onChange={handleNewPostInput}
        />
        <button type="submit">create</button>
      </form>
    </>
  );

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

  return (
    <div>
      <Notification error={error} />
      {user ? (
        <div>
          <h2>blogs</h2>
          <p>{`${user.name} logged in`}</p>
          <button onClick={handleLogout}> logout</button>
          {newPostForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        loginForm()
      )}
    </div>
  );
};

export default App;
