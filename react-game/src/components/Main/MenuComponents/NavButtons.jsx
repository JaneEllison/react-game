const NavButtons = ({
  startNewGame,
  backToGame,
}) => {
  return (
    <div className="nav__buttons" >
      <button
        className="start__button"
        onClick={startNewGame}
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