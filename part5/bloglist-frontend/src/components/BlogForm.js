import React, { useState } from 'react';

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    handleAddBlog({
      title,
      url,
      author,
    });
  };
  return (
    <form onSubmit={addBlog}>
      <label htmlFor='url'>url</label>
      <input
        id='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <label htmlFor='author'>author</label>
      <input
        id='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor='title'>title</label>
      <input
        id='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <button id='create-blog' type='submit'>
        create
      </button>
    </form>
  );
};

export default BlogForm;
