import './App.css';
import React, { useState, useEffect, createContext } from "react";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';
import { lightTheme, darkTheme } from './constants/themeSettings'

export const ModeContext = createContext('dark');

function App() {
  const [options, setOptions] = useState({
    difficult: null,
    theme: 'stars',
  });

  const [currentMode, setCurrentMode] = useState('dark');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('mode') === 'light') {
      setCurrentMode('light');
      setIsChecked(true);
    }
  }, []);

  useEffect(() => {
    const theme = currentMode === 'light' ? lightTheme : darkTheme;

    Object.keys(theme).forEach(key => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [currentMode]);

  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    setIsChecked(!isChecked);
    setCurrentMode(newMode);
    localStorage.setItem('mode', newMode);
  };

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
    <ModeContext.Provider value={currentMode}>
      <div className="App">
        <Header
          isRunningStopwatch={isRunningStopwatch}
          stopwatchSeconds={stopwatchSeconds}
          setStopwatchSeconds={setStopwatchSeconds}
          movesCount={movesCount}
          highScore={highScore}
          toggleTheme={toggleTheme}
          isChecked={isChecked}
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
    </ModeContext.Provider>
  );
}

export default App;
