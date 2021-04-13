import React from 'react';

const Country = (props) => {
  return (
    <>
      <li>
        {props.name}
        <button onClick={props.handleShowCountry}>show</button>
      </li>
    </>
  );
};

export default Country;
