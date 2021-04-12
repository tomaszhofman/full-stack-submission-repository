import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const total = course.parts
    .map((item) => item.exercises)
    .reduce((acc, item) => acc + item);

  return <p>Number of exercises {total}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((item) => (
        <Part key={item.id} part={item} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

export default Course;
