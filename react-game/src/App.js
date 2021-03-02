import './App.css';
import React, { useState, useEffect } from "react";
import MemoryGame from './components/MemoryGame';
import Time from './components/Time';
import { ThemeButtons, DifficultButtons } from './constants/buttons';

function App() {
  const [options, setOptions] = useState({
    difficult: null,
    theme: null,
  });
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [currentOptions, setCurrentOptions] = useState({
    currentDifficult: null,
    currentTheme: null,
  });
  const chooseCurrentOption=(event) => {
    (event.target.className === 'card__bg')
    ? setCurrentOptions({...currentOptions, currentTheme:event.target.innerText})
    : setCurrentOptions({...currentOptions, currentDifficult:event.target.innerText})
  }

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
              {DifficultButtons.map((button)=>(
                <button 
                  key={button.id}
                  className={currentOptions.currentDifficult === button.text ? "active" : ""}
                  onClick={(event)=> {
                    setOptions({
                    ...options,
                    difficult: button.value,
                    });
                    chooseCurrentOption(event);
                  }}
                >
                  {button.text}
                </button>
              ))
              }
              <h2>Choose a theme:</h2>
              <div className="bg__settings">
                {ThemeButtons.map((button)=>(
                  <div className="block__settings" key={button.id}>
                    <button 
                      className={currentOptions.currentTheme === button.text ? "card__bg active" : "card__bg"}
                      onClick={(event)=> {
                        setOptions({
                        ...options,
                        theme: button.text,
                        });
                        chooseCurrentOption(event);
                      }}
                    >
                      {button.text}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={()=>{
                  setIsGameStarted(true);
                  setStopwatchSeconds(0); 
                  setMovesCount(0);
                }}
                disabled={options.difficult === null || options.theme === null}
              >
                Start new game
              </button>
              <button
                onClick={()=>{
                  setIsGameStarted(true);
                  setIsRunningStopwatch(true);
                }}
              >
                Back
              </button>
            </div>
            )
          : (
              <>
                <button
                  onClick={() => {
                    setStopwatchSeconds(0);
                    setMovesCount(0);
                    setIsGameStarted(false);
                    setTimeout(() => {
                      setIsGameStarted(true);
                    }, 5);
                  }}
                >
                  Restart
                </button>
                <button onClick={() => {
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
