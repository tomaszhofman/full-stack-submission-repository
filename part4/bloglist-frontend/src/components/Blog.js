import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';
import blogService from '../services/blogs';
import { deleteBlog, updateLikes } from '../reducers/blogRecuder';
const Blog = ({ blog, setBlogs, blogs, onClick }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const updatelikes = async () => {
    // const likes = blog.likes + 1;
    // const newBlog = { ...blog, likes };
    // console.log(blog.id, newBlog);
    // const response = await blogService.update(blog.id, newBlog);
    // console.log(response);
    // setBlogs(blogs.map((blog) => (blog.id !== newBlog.id ? blog : response)));
    dispatch(updateLikes(blog.id));
  };

  const handleDelete = async () => {
    const blogId = blog.id;
    if (window.confirm('Do you really want to leave?')) {
      // const response = await blogService.deleteItem(blogId);
      // console.log(response);

      dispatch(deleteBlog(blogId));

      // setBlogs(blogs.filter((blog) => blog.id !== blogId));
    }
  };
  return (
    <div style={blogStyle} onClick={onClick}>
      {console.log(blog)}
      {blog.title}
      <Togglable buttonLabel="view">
        {blog.url}
        <br />
        {blog.likes} <button onClick={updatelikes}>vote</button>
        <br />
        {blog.author}
        <button id="remove" onClick={handleDelete}>
          remove
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
