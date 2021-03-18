import './App.css';
import React, { useState, useEffect, createContext } from "react";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';
import { lightTheme, darkTheme } from './constants/themeSettings'

export const ModeContext = createContext('dark');

function App() {
  const savedTheme = JSON.parse(localStorage.getItem('memorygametheme'));
  const savedDifficult = JSON.parse(localStorage.getItem('memorygamedifficult'));
  const savedSeconds = JSON.parse(localStorage.getItem('memorygameseconds'));
  const savedMoves = JSON.parse(localStorage.getItem('memorygamemoves'));
  const savedStartGame = JSON.parse(localStorage.getItem('memorygamestart'));
  
  //+
  const [options, setOptions] = useState({
    difficult: savedDifficult || null,
    theme: savedTheme || 'stars',
  });

  //+
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

  //+
  const [currentOptions, setCurrentOptions] = useState({
    currentDifficult: savedDifficult || null,
    currentTheme: savedTheme || null,
  });

  //+
  const [isGameStarted, setIsGameStarted] = useState(savedStartGame || false);
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(savedSeconds || 0);
  const [movesCount, setMovesCount] = useState(savedMoves || 0);
  const [highScore, setHighScore] = useState(0);


  const chooseCurrentOption=(event) => {
    (event.target.className === 'card__bg' || event.target.className === 'card__bg active')
    ? setCurrentOptions({...currentOptions, currentTheme:event.target.innerText})
    : setCurrentOptions({...currentOptions, currentDifficult:event.target.innerText})
  };

  useEffect(() => {
    const highScore = localStorage.getItem('memorygamehighscore');
    const savedScore = JSON.parse(highScore);
    if (savedScore) {
      setHighScore(savedScore);
    };
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
