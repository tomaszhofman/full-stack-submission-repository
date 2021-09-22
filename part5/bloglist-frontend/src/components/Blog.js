import React, { useState } from 'react';
import blogService from './../services/blogs';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [details, setDetails] = useState(false);

  const { id = '' } = parseJwt(user.token) || {};

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetails(!details);
  };

  const like = async () => {
    const likes = blog.likes + 1;
    const updateBlog = { ...blog, likes };
    const response = await blogService.update(blog.id, updateBlog);
    setBlogs(blogs.map((el) => (el.id === blog.id ? response : el)));
  };

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title}) by ${blog.author}`)) {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((el) => el.id !== blog.id));
    }
  };
  return (
    <div id='blog' style={blogStyle}>
      {details ? (
        <div>
          {blog.title}
          <button onClick={toggleDetails}>hide</button> <br />
          {blog.url} <br />
          {blog.likes}
          <button id='like' onClick={like}>
            like
          </button>
          <br />
          added by {blog.author}
          {id === blog.user.id ? (
            <button onClick={remove}>remove</button>
          ) : null}
        </div>
      ) : (
        <>
          {blog.title}
          <button onClick={toggleDetails}>view</button>
        </>
      )}
    </div>
  );
};

export default Blog;
