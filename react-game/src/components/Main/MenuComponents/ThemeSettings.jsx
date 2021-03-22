import React, { useEffect, useCallback } from "react";
import useStore from '../../../core/store/useStore';
import { ThemeButtons } from '../../../constants/buttons';
import images from '../../../constants/themes';

const ThemeSettings = ({
  setCurrentImages,
}) => {

  const {dispatch, state} = useStore();

  const changeCardTheme = useCallback((value) => {
    let cardThemeName = value.toLowerCase();

    dispatch({
      type: 'CHANGE_THEME',
      payload: {cardTheme: cardThemeName},
    });
  });

  // const themeGame = localStorage.getItem('memorygametheme');
  // const savedTheme = JSON.parse(themeGame);

  // useEffect(() => {
  //   let themeName = state.theme.toLowerCase();    
  //   const theme = JSON.stringify(themeName);
  //   localStorage.setItem('memorygametheme', theme);

  //   if(themeGame) {
  //     setCurrentImages(images[theme]);
  //   }
  // }, [state.theme]);

  return (
    <div>
      <h3>Choose a theme:</h3>
      <div className="bg__settings">
        {ThemeButtons.map((button) => (
          <div className="block__settings" key={button.id}>
            <button
              className={
                (state.theme === button.text.toLocaleLowerCase())
                ? "card__bg active"
                : "card__bg"
              }
              onClick={() => changeCardTheme(button.text)}
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