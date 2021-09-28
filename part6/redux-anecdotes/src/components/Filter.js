import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  console.log(props);
  // const dispatch = useDispatch();
  const handleChange = (event) => {
    const content = event.target.value;

    // dispatch(setFilter(content));
    props.setFilter(content);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  setFilter,
};

const ContectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ContectedFilter;
