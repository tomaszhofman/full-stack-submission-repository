import React from 'react';
import '../style.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <div className="notification">{notification}</div>
    </div>
  );
};

export default Notification;
