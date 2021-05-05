import React, { useEffect } from 'react';

import usersServices from '../services/users';

const Users = () => {
  useEffect(() => {
    const response = usersServices.getAll();
    console.log(response);
  }, []);
  return <div>test</div>;
};

export default Users;
