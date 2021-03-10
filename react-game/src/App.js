import './App.css';
import React, { useState, useEffect, createContext } from "react";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';

import bgLightImage from './assets/header-light.jpg';
import bgDarkImage from './assets/header-dark.jpg';
import bgBodyLightImage from './assets/body-light.jpg';
import bgBodyDarkImage from './assets/body-dark.jpg';
import bgImageCardLight from './assets/card-bg-light.jpg';
import bgImageCardDark from './assets/card-bg.jpg';
import bgPopupLight from './assets/popup_bg-light.png';
import bgPopupDark from './assets/popup_bg.png';


const lightTheme = {
  "--color-text": "rgb(0, 0, 0)",

  "--color-text-header": "#fff",
  "--bg-color-header": "rgb(0, 0, 0)",
  "--bg-image-header": `url(${bgLightImage})`,

  "--bg-color-app": "#fff",
  "--bg-image-main-container": `url(${bgBodyLightImage})`,

  "--bg-color-popup": "rgb(0, 0, 0)",
  "--bg-image-popup": `url(${bgPopupLight})`,

  "--bg-color-popup-finish-button": "#402377d5",
  "--text-color-popup-finish-button": "#fff",

  "--bg-color-button": "rgb(0, 103, 143)",
  "--text-color-button": "#fff",
  "--bg-color-button-disabled": "rgba(109, 214, 255, 0.9)",
  "--bg-color-button-hover": "#1b85dbf3",
  "--bg-color-button-active": "#1b85dbf3",

  "--bg-color-card":"transparent", 
  "--bg-image-card": `url(${bgImageCardLight})`,
};

const darkTheme = {
  "--color-text": "rgb(255, 255, 255)",

  "--color-text-header": "#ffffff",
  "--bg-color-header": "rgba(0, 0, 0, 0.76)",
  "--bg-image-header": `url(${bgDarkImage})`,

  "--bg-color-app": "#1a1a1a",
  "--bg-image-main-container": `url(${bgBodyDarkImage})`,

  "--bg-color-popup": "rgb(0, 0, 0)",
  "--bg-image-popup": `url(${bgPopupDark})`,

  "--bg-color-popup-finish-button": "#402377d5",
  "--text-color-popup-finish-button": "#fff",

  "--bg-color-button": "#202020fd",
  "--text-color-button": "#fff",
  "--bg-color-button-disabled": "#afafae81",
  "--bg-color-button-hover": "#000000e5",
  "--bg-color-button-active": "#000000e5",

  "--bg-color-card":"transparent", 
  "--bg-image-card": `url(${bgImageCardDark})`,
};
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
