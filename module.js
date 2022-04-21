import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul>
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

  return (
    <div>
      <h2>Guessing Game</h2>
      <p>Number of Guesses Allowed: {numberOfGuessesAllowed}</p>
      <p>
        Range of Numbers: {minimumNumber} - {maximumNumber}
      </p>
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
  const [numberOfGuessesAllowed, setNumberOfGuessesAllowed] = useState(1);
  const [minimumNumber, setMinimumNumber] = useState(1);
  const [maximumNumber, setMaximumNumber] = useState(100);

  console.log(
    numberOfGuessesAllowed + " " + minimumNumber + " " + maximumNumber
  );

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
