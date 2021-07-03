const Total = ({ course: { name, parts } }) => {
  console.log(parts);

  const sum = parts.reduce((acc, item) => item.exercises + acc, 0);

  return <p>Number of exercise {sum}</p>;
};

export default Total;
