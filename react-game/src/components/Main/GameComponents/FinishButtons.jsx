const FinishButtons = ({
  startNewGame,
  backToMenu,
}) => {
  return (
    <div className="finish__buttons">
      <button
        className="finish__button"
        onClick={startNewGame}
      >
        Start new game
      </button>
      <button
        className="finish__button"
        onClick={backToMenu}
      >
        Back to menu
      </button>
    </div>
  )
}

export default FinishButtons;