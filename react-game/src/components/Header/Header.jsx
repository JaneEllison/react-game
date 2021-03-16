import '../Header/SwitcherStyle.css'
import Counter from '../Header/Counter';
import React, { useEffect } from "react";

const Header = ({
  highScore,
  isRunningStopwatch,
  stopwatchSeconds,
  setStopwatchSeconds,
  movesCount,
  toggleTheme,
  isChecked,
}) => {
    return (
    <header className="App-header">
      <h1>
        Memory Game
      </h1>
      <span className="switcher switcher__theme">
        <input
          type="checkbox"
          id="switcher__theme"
          onChange={toggleTheme}
          checked={isChecked}
        />
        <label htmlFor="switcher__theme"></label>
      </span>
      <div>
        High Score: {highScore}
      </div>
      <Counter
        isRunningStopwatch={isRunningStopwatch}
        stopwatchSeconds={stopwatchSeconds}
        setStopwatchSeconds={setStopwatchSeconds}
        movesCount={movesCount}
      />
    </header>
  )
};

export default Header;