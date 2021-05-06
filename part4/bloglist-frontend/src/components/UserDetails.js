import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { findUserBlogs, inicalizeUsers } from '../reducers/usersReducer';
import blogs from '../services/blogs';

const UserDetails = () => {
  const users = useSelector((state) => state.users.users);
  const userBlogs = useSelector((state) => state.users.userBlogs);
  console.log(userBlogs);

  const match = useRouteMatch('/users/:id');
  const dispatch = useDispatch();

  console.log(match);

  useEffect(() => {
    dispatch(inicalizeUsers());
    dispatch(findUserBlogs(match.params.id));
  }, []);

  if (!users) {
    return <div>Loading....</div>;
  }

  if (userBlogs.blogs === undefined) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <h1>{userBlogs.username}</h1>
      <div>Blogs created</div>

      {userBlogs.blogs.map((el) => (
        <div>{el.title}</div>
      ))}
    </>
  );
};

export default UserDetails;
