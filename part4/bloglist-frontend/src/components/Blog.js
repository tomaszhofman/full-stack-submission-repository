import React, { useState } from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';
const Blog = ({ blog, setBlogs, blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updatelikes = async () => {
    const likes = blog.likes + 1;
    const newBlog = { ...blog, likes };
    console.log(blog.id, newBlog);
    const response = await blogService.update(blog.id, newBlog);

    console.log(response);
    setBlogs(blogs.map((blog) => (blog.id !== newBlog.id ? blog : response)));
  };
  return (
    <div style={blogStyle}>
      {console.log(blog)}
      {blog.title}
      <Togglable buttonLabel="view">
        {blog.url}
        <br />
        {blog.likes} <button onClick={updatelikes}>vote</button>
        <br />
        {blog.author}
      </Togglable>
    </div>
  );
};

export default Blog;
