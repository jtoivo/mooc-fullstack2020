import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <div>No feedback given.</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={(good - bad) / all} />
        <StatisticLine text="Positive" value={(good / all) * 100 + " %"} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handler={() => setGood(good + 1)} />
      <Button text="Neutral" handler={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handler={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
