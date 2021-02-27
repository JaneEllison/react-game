import './App.css';
import React, { useState, useEffect } from "react";
import MemoryGame from './components/MemoryGame'
import Time from './components/Time'

function App() {
  const [options, setOptions] = useState(null);
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
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
        />
      </header>
      <main>
        { options === null 
          ? (
              <>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
              </>
            )
          : (
              <>
                <button
                  onClick={() => {
                    const prevOptions = options;
                    setOptions(null);
                    setStopwatchSeconds(0);
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
                  setStopwatchSeconds(0);
                }}>
                  Main Menu
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
              />
              ) 
            : (
                <h2>Choose a difficulty to begin!</h2>
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
