import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifiaction = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <>{notifiaction ? <div style={style}>{notifiaction}</div> : null}</>;
};

export default Notification;
