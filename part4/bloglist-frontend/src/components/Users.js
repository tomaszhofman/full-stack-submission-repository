import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { inicalizeUsers } from '../reducers/usersReducer';
import User from './User';

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(inicalizeUsers());
    console.log(users);
  }, []);

  const handleGetUser = (id) => {
    history.push(`/users/${id}`);
  };

  if (!users) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <h1>Users</h1>

      <div>Blogs created</div>

      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onClick={() => handleGetUser(user.id)}
        />
      ))}
    </>
  );
};

export default Users;
