import React from 'react';

const User = (props) => {
  console.log(props);

  const blogsCreated = props.user.blogs.length;
  console.log(blogsCreated);
  return (
    <div>
      <div {...props}>{props.user.name} </div>
      <div>{blogsCreated}</div>
    </div>
  );
};

export default User;
