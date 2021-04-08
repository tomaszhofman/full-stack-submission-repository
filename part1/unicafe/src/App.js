import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const Statistic = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0) return <h3>No feedback given</h3>;
  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
      <Statistic
        text="positive"
        value={`${(good / (bad + good + neutral)) * 100}%`}
      />
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => {
    console.log('click');
    setGood(good + 1);
  };
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };
  const handleBadFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />

      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />

      <Header text="statistics" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
