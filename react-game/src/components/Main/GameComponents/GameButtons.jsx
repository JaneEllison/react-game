const GameButtons = ({
  setIsGameStarted,
  setIsRunningStopwatch,
  setStopwatchSeconds,
  setMovesCount,
}) => {
  return (
    <div>
      <button
        className="restart__button"
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
    </div>
  )
}

export default GameButtons;