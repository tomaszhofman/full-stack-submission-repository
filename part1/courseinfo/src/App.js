import React from 'react';

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part content={props.parts[0]} />
      <Part content={props.parts[1]} />
      <Part content={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  console.log(props.parts);
  return (
    <p>
      Number of exercises
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
