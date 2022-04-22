import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">User Settings</Link>
          </li>
          <li>
            <Link to="/stats">Player Stats</Link>
          </li>
        </ul>
      </nav>
      <hr />

      <Outlet />
    </>
  );
}

function Home(props) {
  let { numberOfGuessesAllowed, minimumNumber, maximumNumber } = props;
  const [roundNumber, setRoundNumber] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [guess, setGuess] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [message, setMessage] = useState("");

  const startNewRound = () => {
    setAnswer(
      Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
        minimumNumber
    );
    setRoundNumber(roundNumber + 1);
    setGuess("");
    setGuessNumber(1);
    setMessage("");
  };

  const guessForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label>Guess: </label>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />{" "}
        &nbsp;
        <input type="submit" />
      </form>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGuessNumber(guessNumber + 1);

    if (guessNumber > numberOfGuessesAllowed) {
      setMessage(
        `Sorry, you already reached the maximum number of allowed guesses. The answer was ${answer}. Please start a new round.`
      );
    } else {
      if (guess == answer) {
        setMessage("You guessed correctly.");
      }
      if (guess < answer) {
        setMessage("Your guess is too low.");
      }
      if (guess > answer) {
        setMessage("Your guess is too high.");
      }
    }
  };

  return (
    <div>
      <h2>Guessing Game</h2>
      <p>Number of Guesses Allowed: {numberOfGuessesAllowed}</p>
      <p>
        Range of Numbers: {minimumNumber} - {maximumNumber}
      </p>
      <button onClick={startNewRound}>Start New Round</button>
      <br />
      <br />
      {roundNumber > 0 && guessForm()}
      {message}
    </div>
  );
}

function Settings(props) {
  const {
    numberOfGuessesAllowed,
    minimumNumber,
    maximumNumber,
    setNumberOfGuessesAllowed,
    setMinimumNumber,
    setMaximumNumber,
  } = props;
  return (
    <div>
      <h2>User Settings</h2>
      <form>
        <label htmlFor="numberGuesses">Number of Guesses Allowed: </label>
        <input
          type="number"
          name="numberGuesses"
          id="numberGuesses"
          defaultValue={numberOfGuessesAllowed}
          onChange={(e) => setNumberOfGuessesAllowed(e.target.value)}
        />
        <br />
        <label htmlFor="minNum">Minimum Number of Guessing Range: </label>
        <input
          type="number"
          name="minNum"
          id="minNum"
          defaultValue={minimumNumber}
          onChange={(e) => setMinimumNumber(e.target.value)}
        />
        <br />
        <label htmlFor="maxNum">Maximum Number of Guessing Range: </label>
        <input
          type="number"
          name="maxNum"
          id="maxNum"
          defaultValue={maximumNumber}
          onChange={(e) => setMaximumNumber(e.target.value)}
        />
      </form>
    </div>
  );
}

function Stats() {
  return (
    <div>
      <h2>Player Stats</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404</h2>
    </div>
  );
}

export function GuessApp() {
  const [numberOfGuessesAllowed, setNumberOfGuessesAllowed] = useState(2);
  const [minimumNumber, setMinimumNumber] = useState(1);
  const [maximumNumber, setMaximumNumber] = useState(100);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                numberOfGuessesAllowed={numberOfGuessesAllowed}
                minimumNumber={minimumNumber}
                maximumNumber={maximumNumber}
              />
            }
          />
          <Route
            path="settings"
            element={
              <Settings
                numberOfGuessesAllowed={numberOfGuessesAllowed}
                minimumNumber={minimumNumber}
                maximumNumber={maximumNumber}
                setNumberOfGuessesAllowed={setNumberOfGuessesAllowed}
                setMinimumNumber={setMinimumNumber}
                setMaximumNumber={setMaximumNumber}
              />
            }
          />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
