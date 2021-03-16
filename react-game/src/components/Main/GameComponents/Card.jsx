import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import sounds from '../../../constants/sounds'

const [themeMusic, rightSouns, wrongSound, finishSound] = sounds;

const Card = ({
  id,
  image,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
  movesCount,
  setMovesCount,
  playSound,
  setCurrentTrack,
  field,
}) => {
  useEffect(() => {
    if(game[id].flipped){
      setFlipped(flipped => !flipped);
    }
  },[])

  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 6, tension: 500, friction: 90 },
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        setFlipped(flipped => !flipped);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
        setCurrentTrack(wrongSound);
        playSound();
      }, 1000)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
      setTimeout(() => {
        setCurrentTrack(rightSouns);
        playSound();
      }, 1000)
    }
  }, [flippedIndexes]);

  const onCardClick = () => {
    setTimeout(() => {
      setCurrentTrack(rightSouns);
      playSound();
    }, 1000)

    if ((!game[id].flipped && flippedCount % 3 === 0) ||
      (flippedCount % 3 === 1 && !game[id].flipped && flippedIndexes.indexOf(id) < 0)
    ) {
      setFlipped(flipped => !flipped);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
      setMovesCount(movesCount + 1);
    };
  };

  return (
    <div onClick={onCardClick}>
      <a.div
        className={`c back ${field}`}
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className={`c front ${field}`}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          backgroundImage: `url(${image})`,
        }}
      />
    </div>
  )
}

export default Card;