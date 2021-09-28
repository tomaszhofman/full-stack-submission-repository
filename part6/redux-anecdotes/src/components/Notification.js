import React from 'react';
import { connect, useSelector } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector(({ notification }) => notification);

  if (!props.notification) {
    return null;
  }

  console.log(props.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ContenctedNotification = connect(mapStateToProps)(Notification);

export default ContenctedNotification;
