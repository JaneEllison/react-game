import './App.css';
import React, { useState, useEffect, useLayoutEffect } from "react";
import MemoryGame from './components/MemoryGame';
import Time from './components/Time';
import { ThemeButtons, DifficultButtons } from './constants/buttons';
import sounds from './constants/sounds'

const [ themeMusic ] = sounds;

function App() {
  const [options, setOptions] = useState({
    difficult: null,
    theme: null,
  });
  const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [soundValue, setSoundValue] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(null);

  const [isMusicOn, setIsMusicOn] = useState(true);
  const [musicValue, setMusicValue] = useState(0.5);
  
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [currentOptions, setCurrentOptions] = useState({
    currentDifficult: null,
    currentTheme: null,
  });
  const chooseCurrentOption=(event) => {
    (event.target.className === 'card__bg' || event.target.className === 'card__bg active')
    ? setCurrentOptions({...currentOptions, currentTheme:event.target.innerText})
    : setCurrentOptions({...currentOptions, currentDifficult:event.target.innerText})
  };
  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [gameStats, setGameStats] = useState();

  const changeSoundState = () =>{
    setIsSoundOn(!isSoundOn);
    handleMuteSound();
  };

  const changeMusicState = () =>{
    setIsMusicOn(!isMusicOn);
    handleMuteMusic();
  };

  let audioPlayer;
  let soundPlayer;

  const initPlayer = () => {
    audioPlayer = document.getElementById('music');
    soundPlayer = document.getElementById('sound')
  };

  const handleMuteMusic = () => {
    if (isMusicOn) {
      setTimeout(() => {
        audioPlayer.muted=true;
        setMusicValue(0);
      }, 0);
    } else {
      setTimeout(() => {
        audioPlayer.muted=false;
        setMusicValue(0.5);
      }, 0);
    }
  };

  const handleMuteSound = () => {
    if (isSoundOn) {
      setTimeout(() => {
        soundPlayer.muted=true;
        setSoundValue(0);
      }, 0);
    } else {
      setTimeout(() => {
        soundPlayer.muted=false;
        setSoundValue(0.5);
      }, 0);
    }
  };

  const setVolumeAudio = () => {
    audioPlayer.volume = musicValue;
  };

  const setVolumeSound = () => {
    soundPlayer.volume = soundValue;
  };

  const playSound = () => {
    soundPlayer.play();
  }

  const formatVolume = (volume) => `${Math.round(volume * 10000) / 100}%`;

  useLayoutEffect(() => {
    initPlayer();
  });

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore');
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setHighScore(savedScore);
    }
    audioPlayer.play();
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
        <audio
          src={themeMusic}
          id='music'
          loop={true}
        />
        <audio
          src={currentTrack}
          id='sound'
        />
        { !isGameStarted
          ? (
            <div className="difficult__buttons">
              Change theme:
              <span className="switcher switcher__theme">
                <input 
                  type="checkbox" id="switcher__theme" />
                <label htmlFor="switcher__theme"></label>
              </span>
              <div className='sound__settings'>
                <div className='sound__block'>
                  Sound Settings:
                  <div className='sound__range_icon'>
                    <div className='sound'>
                      <div 
                        className={isSoundOn ? 'sound__icon on' : 'sound__icon off'}
                        onClick={changeSoundState}
                      />
                    </div>
                    <div className='sound__range'>
                      <input type="range"
                        id="sound"
                        name="sound"
                        min="0"
                        max="1"
                        step='0.01'
                        value={soundValue}
                        onChange={(event)=>{
                          setSoundValue(event.target.value);
                          setVolumeSound();
                        }}
                        disabled={!soundValue}
                      />
                      <label htmlFor="sound">{formatVolume(soundValue)}</label>
                    </div>
                  </div>
                </div>
                <div className='sound__block'>
                  Music Settings:
                  <div className='sound__range_icon'>
                    <div className='sound'>
                      <div 
                        className={isMusicOn ? 'music__icon on' : 'music__icon off'}
                        onClick={changeMusicState}
                      />
                    </div>
                    <div className='sound__range'>
                        <input
                          type="range"
                          id="music"
                          name="music"
                          min="0"
                          max="1"
                          step='0.01'
                          value={musicValue}
                          onChange={(event)=>{
                            setMusicValue(event.target.value);
                            setVolumeAudio();
                          }}
                          disabled={!musicValue}
                        />
                        <label htmlFor="music">{formatVolume(musicValue)}</label>
                    </div>
                  </div>
                </div>
              </div>
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
                  highScore={highScore}
                  setHighScore={setHighScore}
                  setIsRunningStopwatch={setIsRunningStopwatch}
                  stopwatchSeconds={stopwatchSeconds}
                  setStopwatchSeconds={setStopwatchSeconds}
                  movesCount={movesCount}
                  setMovesCount={setMovesCount}
                  setIsGameStarted={setIsGameStarted}
                  playSound={playSound}
                  setCurrentTrack={setCurrentTrack}
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
