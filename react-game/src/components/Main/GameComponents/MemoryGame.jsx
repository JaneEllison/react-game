import React, { useState, useEffect } from "react";
import Card from './Card';
import sounds from '../../../constants/sounds';

const finishSound = [...sounds].pop();

const MemoryGame = ({ 
  options,
  highScore,
  setHighScore,
  setIsRunningStopwatch,
  movesCount,
  setMovesCount,
  setIsGameStarted,
  playSound,
  setCurrentTrack,
  field,
  currentImages,
  setIsGameFinished,
  setField,
}) => {
  const savedGame = JSON.parse(localStorage.getItem('memorygame'));
  const savedField = JSON.parse(localStorage.getItem('memoryfield'));

  //+
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  useEffect(() => {
    if(movesCount === 0) {
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
    } else {
      setGame(savedGame);
      setIsRunningStopwatch(true);
      setField(savedField);
    }
  }, [currentImages, options.difficult]);

  useEffect(() => {
    const finished = !game.some(card => !card.flipped);

    if (finished && game.length > 0) {
      setTimeout(() => {
        let score = movesCount;
        if (score > highScore) {
          setHighScore(score);
          const savedHighScore = JSON.stringify(highScore);
          localStorage.setItem('memorygamehighscore', savedHighScore);
        }
        setCurrentTrack(finishSound);
        playSound();
      }, 1000)
      setIsGameFinished(true);
      setIsGameStarted('false');
      setIsRunningStopwatch(false);
    }

    const savedGame = JSON.stringify(game);
    localStorage.setItem('memorygame', savedGame);

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
      const newIndexes = [...flippedIndexes];
      newIndexes.push(true);
      setFlippedIndexes(newIndexes);
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