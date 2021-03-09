import './App.css';
import React, { useState, useEffect } from "react";
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

function App() {
  const [options, setOptions] = useState({
    difficult: null,
    theme: 'stars',
  });

  const [currentOptions, setCurrentOptions] = useState({
    currentDifficult: null,
    currentTheme: null,
  });

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);


  const chooseCurrentOption=(event) => {
    (event.target.className === 'card__bg' || event.target.className === 'card__bg active')
    ? setCurrentOptions({...currentOptions, currentTheme:event.target.innerText})
    : setCurrentOptions({...currentOptions, currentDifficult:event.target.innerText})
  };

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore');
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setHighScore(savedScore);
    }
  }, []);

  return (
    <div className="App">
      <Header
        isRunningStopwatch={isRunningStopwatch}
        stopwatchSeconds={stopwatchSeconds}
        setStopwatchSeconds={setStopwatchSeconds}
        movesCount={movesCount}
        highScore={highScore}
      />
      <Main
        isGameStarted={isGameStarted}
        currentOptions={currentOptions}
        options={options}
        setOptions={setOptions}
        chooseCurrentOption={chooseCurrentOption}
        setStopwatchSeconds={setStopwatchSeconds}
        setMovesCount={setMovesCount}
        setIsGameStarted={setIsGameStarted}
        setIsRunningStopwatch={setIsRunningStopwatch}
        highScore={highScore}
        setHighScore={setHighScore}
        stopwatchSeconds={stopwatchSeconds}
        movesCount={movesCount}

      />
      <Footer />
    </div>
  );
}

export default App;
