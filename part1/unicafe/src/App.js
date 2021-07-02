import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ name, value }) => {
  return (
    <tr>
      <td>
        {name}: {value}
      </td>
    </tr>
  );
};

const Statisctics = (props) => {
  return (
    <tbody>
      <Statistic name="good" value={props.all} />
      <Statistic name="nautral" value={props.neutral} />
      <Statistic name="bad" value={props.bad} />
      <Statistic name="all" value={props.all} />
      <Statistic name="average" value={props.average} />
      <Statistic name="positive" value={props.positive} />
    </tbody>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = `${(good / all) * 100} %`;

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>

      <h1>Statistic</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statisctics
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
