import React, { useEffect } from "react";

const Counter = ({ isRunningStopwatch, stopwatchSeconds, setStopwatchSeconds, movesCount }) => {
  const changeSeconds = (seconds) => {
    setStopwatchSeconds(seconds);
  };

  const formatTime = (time) => `${(time < 10 ? '0' : '')}${time}`;
  const minutes = Math.floor(stopwatchSeconds / 60);
  const seconds = Math.floor(stopwatchSeconds % 60);
  
  const secondsData = JSON.stringify(stopwatchSeconds);
  localStorage.setItem('memorygameseconds', secondsData);

  const movesData = JSON.stringify(movesCount);
  localStorage.setItem('memorygamemoves', movesData);

  useEffect(() => {
    if (isRunningStopwatch) {
      const stopwatchInterval = window.setInterval(() => {
        changeSeconds((seconds) => seconds + 1);
        
      }, 1000);
      return () => window.clearInterval(stopwatchInterval);
    }
    return undefined;
  }, [isRunningStopwatch]);

  return (
    <div className="statistic">
      <div>
        Time: {`${formatTime(minutes)}:${formatTime(seconds)}`}
      </div>
      <div>
        Moves: {`${movesCount}`}
      </div>
    </div>
  )
}

export default Counter;