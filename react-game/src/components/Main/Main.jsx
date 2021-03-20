import React, { useState, useEffect, useLayoutEffect } from "react";
import SoundSettings from './MenuComponents/SoundsSettings';
import DifficultSettings from './MenuComponents/DifficultSettings';
import ThemeSettings from './MenuComponents/ThemeSettings';
import NavButtons from './MenuComponents/NavButtons';
import GameButtons from './GameComponents/GameButtons';
import sounds from '../../constants/sounds'
import MemoryGame from './GameComponents/MemoryGame'
import EndGamePopup from './GameComponents/EndGamePopup'

import useStore from '../../core/store/useStore'

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
  movesCount,
  stopwatchSeconds,
}) => {
  const savedIsSoundOn = JSON.parse(localStorage.getItem('memorygameissoundon'));
  const savedSoundVolume = JSON.parse(localStorage.getItem('memorygamesoundvolume'));

  const savedIsMusicOn = JSON.parse(localStorage.getItem('memorygameismusicon'));
  const savedMusicVolume = JSON.parse(localStorage.getItem('memorygamemusicvolume'));

  //+
  const [field, setField] = useState('');
  const [currentImages, setCurrentImages] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [isSoundOn, setIsSoundOn] = useState(savedIsSoundOn);
  const [soundValue, setSoundValue] = useState(savedSoundVolume || 0.5);

  const [currentTrack, setCurrentTrack] = useState(null);

  const [isMusicOn, setIsMusicOn] = useState(savedIsMusicOn);
  const [musicValue, setMusicValue] = useState(savedMusicVolume || 0.5);

  let audioPlayer;
  let soundPlayer;

  useEffect(() => {
    if (localStorage.getItem('memorygameissoundon') === null) {
      setIsSoundOn(true);
      soundPlayer.muted = false;
      setSoundValue(0.5);
    } else {
      if(!JSON.parse((localStorage.getItem('memorygameissoundon')))) {
        setIsSoundOn(false);
        soundPlayer.muted = true;
        setSoundValue(0);
      }
    }
    if (localStorage.getItem('memorygameismusicon') === null) {
      setIsMusicOn(true);
      audioPlayer.muted = false;
      setMusicValue(0.5);
    } else {
      if(!JSON.parse((localStorage.getItem('memorygameismusicon')))) {
        setIsMusicOn(false);
        audioPlayer.muted = true;
        setMusicValue(0);
      }
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(isGameStarted);
    localStorage.setItem('memorygamestart', json);
  }, [isGameStarted])

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
    localStorage.setItem('memorygameissoundon', JSON.stringify(!isSoundOn));
    localStorage.setItem('memorygamesoundvolume', soundValue);
  };

  const changeMusicState = () => {
    setIsMusicOn(!isMusicOn);
    handleMuteMusic();
    localStorage.setItem('memorygameismusicon', JSON.stringify(!isMusicOn));
    localStorage.setItem('memorygamemusicvolume', musicValue);
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
    setIsGameStarted(false);
    setStopwatchSeconds(0);
    setMovesCount(0);
    setIsGameFinished(false);
    setTimeout(() => {
      setIsGameStarted(true);
    }, 0);
  };

  const backToGame = () => {
    setIsGameStarted(true);
    setIsRunningStopwatch(true);
  }

  const backToMenu = () => {
    setMovesCount(0);
    setStopwatchSeconds(0);
    setIsGameFinished(false);
    setIsGameStarted(false);
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
      <EndGamePopup
        isGameFinished={isGameFinished}
        stopwatchSeconds={stopwatchSeconds}
        movesCount={movesCount}
        startNewGame={startNewGame}
        backToMenu={backToMenu}
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
              backToGame={backToGame}
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
              movesCount={movesCount}
              setMovesCount={setMovesCount}
              setIsGameStarted={setIsGameStarted}
              playSound={playSound}
              setCurrentTrack={setCurrentTrack}
              field={field}
              setFiel={setField}
              currentImages={currentImages}
              setIsGameFinished={setIsGameFinished}
              movesCount={movesCount}
              setField={setField}
            />
          </>
        )
      }

    </div>
  )
};

export default Main;
