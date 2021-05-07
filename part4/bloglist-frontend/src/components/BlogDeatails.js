import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findBlogDetails } from '../reducers/blogRecuder';

import blogService from '../services/blogs';

const BlogDeatails = () => {
  const match = useRouteMatch('/blogs/:id');
  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.blogs.selectedBlog);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState('');

  useEffect(() => {
    dispatch(findBlogDetails(match.params.id));
  }, []);

  if (!selectedBlog) {
    return <div>..lodaing</div>;
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const response = await blogService.updateComments(selectedBlog.id, form);
    console.log(response);
    setComments(response.comments);
  };

  if (!comments === undefined) {
    return <div>No commetns</div>;
  }
  return (
    <div>
      <h1>{selectedBlog.title}</h1>

      <p>{selectedBlog.url}</p>
      <p>{selectedBlog.likes}</p>
      <p>{selectedBlog.author}</p>

      <h1>comments</h1>

      {comments.map((el) => (
        <div>{el}</div>
      ))}

      {console.log(comments)}

      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={form}
          onChange={(e) => setForm(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BlogDeatails;
