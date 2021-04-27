import React, { useState } from 'react';

const Togglable = (props) => {
  const [visability, setVisablity] = useState(false);

  const hideWhenVisable = { display: visability ? 'none' : '' };
  const showWhenVisable = { display: visability ? '' : 'none' };

  const toggleVisability = () => {
    setVisablity(!visability);
  };
  return (
    <div className="toggableElement">
      <div style={hideWhenVisable}>
        <button onClick={toggleVisability}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisable}>
        {props.children}
        <button onClick={toggleVisability}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
