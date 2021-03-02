import React, { useState, useEffect } from "react";
import  Card from './Card';
import colors from '../constants/abstract'

const MemoryGame = ({ options, setOptions, highScore, setHighScore, setIsRunningStopwatch, 
  setStopwatchSeconds, movesCount, setMovesCount, setIsGameStarted, stopwatchSeconds }) => {

  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const formatTime = (time) => `${(time < 10 ? '0' : '')}${time}`;
  const minutes = Math.floor(stopwatchSeconds / 60);
  const seconds = Math.floor(stopwatchSeconds % 60);

  useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options.difficult / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
    setIsRunningStopwatch(true);
  }, []);

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        let score=movesCount;
        if (score > highScore) {
          setHighScore(score)
          const json = JSON.stringify(score)
          localStorage.setItem('memorygamehighscore', json)
        }

        const newGame = window.confirm(`Wow!, SCORE:${score} TIME:${formatTime(minutes)}:${formatTime(seconds)} New Game?`);
        setMovesCount(0);
        setStopwatchSeconds(0);
        setIsGameStarted(false);
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
    const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

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
        : <div className="cards">
            {game.map((card, index) => (
              <div className="card" key={index}>
                <Card
                  id={index}
                  color={card.color}
                  game={game}
                  flippedCount={flippedCount}
                  setFlippedCount={setFlippedCount}
                  flippedIndexes={flippedIndexes}
                  setFlippedIndexes={setFlippedIndexes}
                  movesCount={movesCount}
                  setMovesCount={setMovesCount}
                />
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default MemoryGame;