const NavButtons = ({
  startNewGame,
  backToGame,
  options,
}) => {
  return (
    <div className="nav__buttons" >
      <button
        className="start__button"
        onClick={startNewGame}
        disabled={options.difficult === null || options.theme === null}
      >
        New game
      </button>
      <button
        onClick={backToGame}
      >
        Back to game
      </button>
    </div>
  )
}

export default NavButtons;