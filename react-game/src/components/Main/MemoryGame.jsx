import React, { useState, useEffect } from "react";
import Card from '../Main/Card';
import images from '../../constants/abstract';
import sounds from '../../constants/sounds';

const finishSound = [...sounds].pop();

const MemoryGame = ({ options, highScore, setHighScore, setIsRunningStopwatch, 
  setStopwatchSeconds, movesCount, setMovesCount, setIsGameStarted, stopwatchSeconds,
  playSound, setCurrentTrack, }) => {

  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const formatTime = (time) => `${(time < 10 ? '0' : '')}${time}`;
  const minutes = Math.floor(stopwatchSeconds / 60);
  const seconds = Math.floor(stopwatchSeconds % 60);

  const [currentImages, setCurrentImages] = useState(null);

  useEffect(() => {
    let theme = options.theme.toLowerCase();
    setCurrentImages(images[theme])
  }, [options.theme]);

  const [field, setField] = useState('');

  useEffect(() => {
    if(options.difficult == 12) {
      setField('field__easy');
    }
    if(options.difficult == 18) {
      setField('field__normal');
    }
    if(options.difficult == 24){
      setField('field__difficult');
    }
  }, [options.difficult]);

  useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options.difficult / 2; i++) {
      const firstOption = {
        id: 2 * i,
        imgId: i,
        image: currentImages?.[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        imgId: i,
        image: currentImages?.[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
    setIsRunningStopwatch(true);
  }, [currentImages]);

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        let score=movesCount;
        if (score > highScore) {
          setHighScore(score);
          const json = JSON.stringify(score);
          localStorage.setItem('memorygamehighscore', json);
        }

        const newGame = window.confirm(`Wow!, SCORE:${score} TIME:${formatTime(minutes)}:${formatTime(seconds)} New Game?`);
        setMovesCount(0);
        setStopwatchSeconds(0);
        setIsGameStarted(false);
        
        setCurrentTrack(finishSound);
        playSound();

        if (newGame) {
          setTimeout(() => {
          setIsGameStarted(true);
          }, 5);
        }
        else {
          setIsRunningStopwatch(false);
        }
      }, 500);
    }
  }, [game]);

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].imgId === game[flippedIndexes[1]].imgId;

    if (match) {
      const newGame = [...game];
      newGame[flippedIndexes[0]].flipped = true;
      newGame[flippedIndexes[1]].flipped = true;
      setGame(newGame);

      const newIndexes = [...flippedIndexes];
      newIndexes.push(false);
      setFlippedIndexes(newIndexes);
    } else {
      const newIndexes = [...flippedIndexes]
      newIndexes.push(true)
      setFlippedIndexes(newIndexes)
    }
  };
  
  return (
    <div>
      {(game.length === 0)
        ? 'loading'
        : <div
            className="cards"
          >
            {game.map((card, index) => (
              <div className={`card ${field}`} key={index}>
                <Card
                  id={index}
                  image={card.image}
                  game={game}
                  flippedCount={flippedCount}
                  setFlippedCount={setFlippedCount}
                  flippedIndexes={flippedIndexes}
                  setFlippedIndexes={setFlippedIndexes}
                  movesCount={movesCount}
                  setMovesCount={setMovesCount}
                  playSound={playSound}
                  setCurrentTrack={setCurrentTrack}
                  field={field}
                />
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default MemoryGame;