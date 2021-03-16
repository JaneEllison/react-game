import React, { useEffect } from "react";
import { ThemeButtons } from '../../../constants/buttons';
import images from '../../../constants/themes';

const ThemeSettings = ({
  currentOptions,
  setOptions,
  options,
  chooseCurrentOption,
  setCurrentImages,
}) => {
  useEffect(() => {
    const themeGame = localStorage.getItem('memorygametheme');
    const savedTheme = JSON.parse(themeGame);

    let theme = options.theme.toLowerCase();    
    const json = JSON.stringify(theme);
    localStorage.setItem('memorygametheme', json);

    if(themeGame) {
      setCurrentImages(images[theme]);
    }
  }, [options.theme]);

  return (
    <div>
      <h3>Choose a theme:</h3>
      <div className="bg__settings">
        {ThemeButtons.map((button) => (
          <div className="block__settings" key={button.id}>
            <button
              className={currentOptions.currentTheme === button.text ? "card__bg active" : "card__bg"}
              onClick={(event) => {
                setOptions({
                  ...options,
                  theme: button.text,
                });
                chooseCurrentOption(event);
              }}
            >
              {button.text}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default ThemeSettings;