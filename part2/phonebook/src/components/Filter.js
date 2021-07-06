import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filtr shown with:
      <input name="search" value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
