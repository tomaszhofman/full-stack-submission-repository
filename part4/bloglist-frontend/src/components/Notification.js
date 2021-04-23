import React from 'react';
import '../style.css';

const Notification = ({ error }) => {
  if (error === null) {
    return null;
  }
  return (
    <div>
      <div className="error">{error}</div>
    </div>
  );
};

export default Notification;
