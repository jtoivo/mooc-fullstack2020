import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Uint32Array(anecdotes.length));

  // get random number 0...length-1, and not the same as previous
  const rnd = () => {
    let n = selected;
    while (n === selected) {
      n = Math.floor(Math.random() * anecdotes.length);
    }
    return n;
  };

  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVote(votesCopy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      <button onClick={vote}>Vote</button>
      <button onClick={() => setSelected(rnd)}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
