import './App.css';
import React, { useState, useEffect } from "react";
import MemoryGame from './components/MemoryGame';
import Time from './components/Time';
import buttons from './constants/buttons';

function App() {
  const [options, setOptions] = useState({
    difficult: null,
    theme: null,
  });
  // const [options, setOptions] = useState(null);
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [isGameStarted, setIsGameStarted] = useState(false);
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
        { !isGameStarted
          ? (
            <div className="difficult__buttons">
              <h2>Choose a difficulty:</h2>
              <button onClick={() => {
                setOptions({difficult:12});
                setStopwatchSeconds(0); 
                setMovesCount(0);
              }}>
                Easy
              </button>
              <button onClick={() => {
                setOptions({difficult:18});
                setStopwatchSeconds(0);
                setMovesCount(0);
              }}>
                Medium
              </button>
              <button onClick={() => {
                setOptions({difficult:24});
                setStopwatchSeconds(0);
                setMovesCount(0);
              }}>
                Hard
              </button>
              <h2>Choose a theme:</h2>
              <div className="bg__settings">
                {buttons.map((button, index)=>(
                  <div className="block__settings" key={index}>
                    <button 
                      name="cardBg"
                      type="radio"
                      className="card__bg"
                      onClick={()=>{setOptions({
                        ...options,
                        theme: button.text,
                      })}}
                    >
                      {button.text}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={()=>setIsGameStarted(true)}
              >
                Start new game
              </button>
            </div>
            )
          : (
              <>
                <button
                  onClick={() => {
                    const prevOptions = options;
                    // setOptions(null);
                    setStopwatchSeconds(0);
                    setMovesCount(0);
                    setIsGameStarted(false);
                    setTimeout(() => {
                      // setOptions(prevOptions);
                      setIsGameStarted(true);
                    }, 5);
                  }}
                >
                  Restart
                </button>
                <button onClick={() => {
                  setOptions({difficult:null});
                  setIsRunningStopwatch(false);
                  setIsGameStarted(false);
                }}>
                  Menu
                </button>
                <MemoryGame
                options={options}
                setOptions={setOptions}
                highScore={highScore}
                setHighScore={setHighScore}
                setIsRunningStopwatch={setIsRunningStopwatch}
                movesCount={movesCount}
                setMovesCount={setMovesCount}
                setIsGameStarted={setIsGameStarted}
                />
              </>
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
