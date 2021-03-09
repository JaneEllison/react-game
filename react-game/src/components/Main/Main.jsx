import React, { useState, useLayoutEffect } from "react";
import SoundSettings from './MenuComponents/SoundsSettings';
import DifficultSettings from './MenuComponents/DifficultSettings';
import ThemeSettings from './MenuComponents/ThemeSettings';
import NavButtons from './MenuComponents/NavButtons';
import GameButtons from './GameComponents/GameButtons';
import sounds from '../../constants/sounds'
import MemoryGame from './GameComponents/MemoryGame'

const [themeMusic] = sounds;

const Main = ({
  isGameStarted,
  currentOptions,
  options,
  setOptions,
  chooseCurrentOption,
  setIsGameStarted,
  setStopwatchSeconds,
  setMovesCount,
  setIsRunningStopwatch,
  highScore,
  setHighScore,
  stopwatchSeconds,
  movesCount,
}) => {
  const [field, setField] = useState('');
  const [currentImages, setCurrentImages] = useState(null);

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [soundValue, setSoundValue] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(null);


  const [isMusicOn, setIsMusicOn] = useState(true);
  const [musicValue, setMusicValue] = useState(0.5);

  let audioPlayer;
  let soundPlayer;

  const initPlayer = () => {
    audioPlayer = document.getElementById('music');
    soundPlayer = document.getElementById('sound')
  };

  useLayoutEffect(() => {
    initPlayer();
    audioPlayer.play();
  });

  const formatVolume = (volume) => `${Math.round(volume * 10000) / 100}%`;

  const changeSoundState = () => {
    setIsSoundOn(!isSoundOn);
    handleMuteSound();
  };

  const changeMusicState = () => {
    setIsMusicOn(!isMusicOn);
    handleMuteMusic();
  };

  const setVolumeAudio = () => {
    audioPlayer.volume = musicValue;
  };
  const setVolumeSound = () => {
    soundPlayer.volume = soundValue;
  };
  const playSound = () => {
    soundPlayer.play();
  };

  const handleMuteMusic = () => {
    if (isMusicOn) {
      setTimeout(() => {
        audioPlayer.muted = true;
        setMusicValue(0);
      }, 0);
    } else {
      setTimeout(() => {
        audioPlayer.muted = false;
        setMusicValue(0.5);
      }, 0);
    }
  };
  const handleMuteSound = () => {
    if (isSoundOn) {
      setTimeout(() => {
        soundPlayer.muted = true;
        setSoundValue(0);
      }, 0);
    } else {
      setTimeout(() => {
        soundPlayer.muted = false;
        setSoundValue(0.5);
      }, 0);
    }
  };

  const startNewGame = () => {
    setIsGameStarted(true);
    setStopwatchSeconds(0);
    setMovesCount(0);
  };

  const backToMenu = () => {
    setIsGameStarted(true);
    setIsRunningStopwatch(true);
  }

  return (
    <div className="main__container">
      <audio
        src={themeMusic}
        id='music'
        loop={true}
      />
      <audio
        src={currentTrack}
        id='sound'
      />
      {!isGameStarted
        ? (
          <>
            <div className="first__block_settings">
              <SoundSettings
                isSoundOn={isSoundOn}
                isMusicOn={isMusicOn}
                changeSoundState={changeSoundState}
                changeMusicState={changeMusicState}
                soundValue={soundValue}
                musicValue={musicValue}
                setMusicValue={setMusicValue}
                setSoundValue={setSoundValue}
                setVolumeSound={setVolumeSound}
                setVolumeAudio={setVolumeAudio}
                formatVolume={formatVolume}
              />
              <DifficultSettings
                currentOptions={currentOptions}
                options={options}
                setOptions={setOptions}
                chooseCurrentOption={chooseCurrentOption}
                field={field}
                setField={setField}
              />
            </div>
            <div className="second__block_settings">
              <ThemeSettings
                currentOptions={currentOptions}
                setOptions={setOptions}
                options={options}
                chooseCurrentOption={chooseCurrentOption}
                setCurrentImages={setCurrentImages}
              />
            </div>
            <NavButtons
              startNewGame={startNewGame}
              backToMenu={backToMenu}
              options={options}
            />
          </>
        )
        : (
          <>
            <GameButtons
              setIsRunningStopwatch={setIsRunningStopwatch}
              setIsGameStarted={setIsGameStarted}
              setStopwatchSeconds={setStopwatchSeconds}
              setMovesCount={setMovesCount}
            />
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
              field={field}
              setFiel={setField}
              currentImages={currentImages}
            />
          </>
        )
      }

    </div>
  )
};

export default Main;