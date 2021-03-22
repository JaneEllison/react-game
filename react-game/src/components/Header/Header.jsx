import '../Header/SwitcherStyle.css';
import {useCallback} from 'react';
import Counter from '../Header/Counter';
import useStore from '../../core/store/useStore';

const Header = ({
  highScore,
  isRunningStopwatch,
  stopwatchSeconds,
  setStopwatchSeconds,
  movesCount,
}) => {
  const {dispatch, state} = useStore();
  const isChecked = state.theme === 'light';

  const toggleTheme = useCallback((event) => {
    const {checked} = event.target;
    const newMode = checked? 'light' : 'dark';

    dispatch({
      type: 'CHANGE_THEME',
      payload: {theme: newMode}
    });

    localStorage.setItem('mode', newMode);
  });


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
