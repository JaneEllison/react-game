import './App.css';
import React, { useState, useEffect } from "react";
import MemoryGame from './components/MemoryGame'
import Time from './components/Time'

function App() {
  const [options, setOptions] = useState(null);
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  // const [gameStats, setGameStats] = useState();

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Memory Game
        </h1>
        <div>
          High Score: {highScore}
        </div>
        <Time
          isRunningStopwatch={isRunningStopwatch}
          stopwatchSeconds={stopwatchSeconds}
          setStopwatchSeconds={setStopwatchSeconds}
          movesCount={movesCount}
        />
      </header>
      <main>
        { options === null 
          ? (
            <div className="difficult__buttons">

              <h2>Choose a difficulty:</h2>
              <button onClick={() => {
                setOptions(12);
                setStopwatchSeconds(0);
                setMovesCount(0);
              }}>
                Easy
              </button>
              <button onClick={() => {
                setOptions(18);
                setStopwatchSeconds(0);
                setMovesCount(0);
              }}>
                Medium
              </button>
              <button onClick={() => {
                setOptions(24);
                setStopwatchSeconds(0);
                setMovesCount(0);
              }}>
                Hard
              </button>
              <h2>Choose a theme:</h2>
              <div className="bg__settings">
                <div className="block__settings">
                  <button 
                    name="cardBg"
                    type="radio"
                    value="abstract"
                    className="card__bg"
                  >
                    Abstract
                  </button>
                  <button
                    name="cardBg"
                    type="radio"
                    value="animals"
                    className="card__bg"
                  >
                    Animals
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="eat"
                  >
                    Eat:
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="fire"
                  >
                    Fire
                  </button>
                </div>
                <div className="block__settings">
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="flora"
                  >
                    Flora
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="landscape"
                  >
                    Landscape
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="neon"
                  >
                    Neon
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="sea"
                  >
                    Sea
                  </button>
                </div>
                <div className="block__settings">
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="stars"
                  >
                    Stars
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="summer"
                  >
                    Summer
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="techologies"
                  >
                    Techologies
                  </button>
                  <button
                    className="card__bg"
                    name="cardBg"
                    type="radio"
                    value="doggo"
                  >
                    Doggo
                  </button>
                </div>
              </div>
              {/* <button onClick={() => {
                setIsRunningStopwatch(true);
              }}>
                Back
              </button> */}
              
            </div>
            )
          : (
              <>
                <button
                  onClick={() => {
                    const prevOptions = options;
                    setOptions(null);
                    setStopwatchSeconds(0);
                    setMovesCount(0);
                    setTimeout(() => {
                      setOptions(prevOptions);
                    }, 5);
                  }}
                >
                  Restart
                </button>
                <button onClick={() => {
                  setOptions(null);
                  setIsRunningStopwatch(false);
                }}>
                  Menu
                </button>
              </>
            )
        }

        {
          options
            ? (
              <MemoryGame
                options={options}
                setOptions={setOptions}
                highScore={highScore}
                setHighScore={setHighScore}
                setIsRunningStopwatch={setIsRunningStopwatch}
                movesCount={movesCount}
                setMovesCount={setMovesCount}
              />
              ) 
            : (
                <button>
                  Start new game
                </button>
              )
        }
      </main>
      <footer>
        <p>
          created by J.Ell.
        </p>
      </footer>
    </div>
  );
}

export default App;
