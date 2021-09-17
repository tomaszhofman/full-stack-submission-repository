import React, { useState } from 'react';

const Toggble = (props) => {
  const [visable, setVisable] = useState(false);

  const hideWhenVisable = { display: visable ? 'none' : '' };
  const showWhenVisable = { display: visable ? '' : 'none' };

  const toggleVisable = () => {
    setVisable(!visable);
  };

  return (
    <div>
      <div style={hideWhenVisable}>
        <button onClick={toggleVisable}>{props.label}</button>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <button onClick={toggleVisable}>cancel</button>
      </div>
    </div>
  );
};

export default Toggble;
