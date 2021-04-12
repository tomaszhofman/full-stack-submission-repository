import React from 'react';

const Filter = (props) => {
  return (
    <form onSubmit={props.handleSearch}>
      <div>
        filter shown with:
        <input
          onChange={(e) => props.setNewSearch(e.target.value)}
          value={props.newSearch}
        />
      </div>
    </form>
  );
};

export default Filter;
