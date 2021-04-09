import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const [mostVoted, setMostVoted] = useState([]);

  const handleNextButton = () => {
    setSelected(selected + 1);
  };

  const handleVoteButton = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    const i = votes.findIndex((el) => el === Math.max(...votes));

    setMostVoted(i);
  };
  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br />
      <Button handleClick={handleVoteButton} text="vote" />
      <Button handleClick={handleNextButton} text="next anecdote" />
      <br />
      <Header text="Anecdote with most votes" />
      {anecdotes[mostVoted]}
      <p>has {votes[mostVoted]} votes</p>
    </div>
  );
};

export default App;
