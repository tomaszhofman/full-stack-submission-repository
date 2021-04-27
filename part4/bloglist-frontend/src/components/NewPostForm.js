import React, { useState } from 'react';

const initialStateBlog = {
  title: '',
  author: '',
  url: '',
};

const NewPostForm = ({ addPost }) => {
  const [post, setNewPost] = useState(initialStateBlog);
  const handleNewPostInput = (e) => {
    setNewPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewPostForm = (e) => {
    e.preventDefault();

    const newUser = {
      title: post.title,
      author: post.author,
      url: post.url,
    };

    setNewPost(initialStateBlog);
    addPost(newUser);
  };
  return (
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
        <button id="create" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default NewPostForm;
