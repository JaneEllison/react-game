import './App.css';
import React, { useState, useEffect } from "react";
import MemoryGame from './components/MemoryGame'

function App() {
  const [options, setOptions] = useState(null);
  const [highScore, setHighScore] = useState(0)


  useEffect(() => {
    // Loads when the game starts
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Memory Game
        </h1>
        <div>
          High Score: {highScore}
        </div>
      </header>
      <main>
        { options === null 
          ? (
              <>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
              </>
            )
          : (
              <>
                <button
                  onClick={() => {
                    const prevOptions = options
                    setOptions(null)
                    setTimeout(() => {
                      setOptions(prevOptions)
                    }, 5)
                  }}
                >
                  Restart
                </button>
                <button onClick={() => setOptions(null)}>Main Menu</button>
              </>
            )
        }

        {
          options
            ? (
              <MemoryGame
                options={options}
                setOptions={setOptions}
                highScore={highScore}
                setHighScore={setHighScore}
              />
              ) 
            : (
                <h2>Choose a difficulty to begin!</h2>
              )
        }
      </main>
      <footer>
        <p>
          created by J.Ell.
        </p>
      </footer>
    </div>
  );
}

export default App;
