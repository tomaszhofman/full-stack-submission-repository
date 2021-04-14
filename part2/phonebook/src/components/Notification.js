import React from 'react';

const Notification = ({ message }) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    border: '3px solid red',
    padding: '3px 10px',
  };

  const sucess = {
    color: 'green',
    background: 'lightgrey',
    border: '3px solid green',
    padding: '3px 10px',
  };
  console.log(message);
  if (message === null) return null;
  return <div style={message.includes('Add') ? sucess : error}>{message}</div>;
};

export default Notification;
