import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ];

  const initialPoints = [1, 3, 4, 2, 0, 0, 0, 0];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
  console.log(points);
  const handleVotes = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);

    console.log(points);
  };

  const maxNumber = points.reduce((acc, el) => (el > acc ? el : acc));
  const findIndex = points.findIndex((el) => el === maxNumber);
  console.log(findIndex);

  console.log(maxNumber);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <div>
        <p> has {points[selected]} potins</p>
      </div>

      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={() => setSelected(randomAnecdoteIndex)}>
          next anecdotes
        </button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[findIndex]}</div>
      <div>has {points[findIndex]} </div>
    </div>
  );
};

export default App;
