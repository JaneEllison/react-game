import ThemeImages from './themeImages';

const [
  bgLightImage,
  bgDarkImage,
  bgBodyLightImage,
  bgBodyDarkImage,
  bgImageCardLight,
  bgImageCardDark,
  bgPopupLight,
  bgPopupDark,
] = ThemeImages;

export const lightTheme = {
  "--color-text": "rgb(0, 0, 0)",

  "--color-text-header": "#fff",
  "--bg-color-header": "rgb(0, 0, 0)",
  "--bg-image-header": `url(${bgLightImage})`,

  "--bg-color-app": "#fff",
  "--bg-image-main-container": `url(${bgBodyLightImage})`,

  "--bg-color-popup": "rgb(0, 0, 0)",
  "--bg-image-popup": `url(${bgPopupLight})`,

  "--bg-color-popup-finish-button": "#402377d5",
  "--text-color-popup-finish-button": "#fff",

  "--bg-color-button": "rgb(0, 103, 143)",
  "--text-color-button": "#fff",
  "--bg-color-button-disabled": "rgba(109, 214, 255, 0.9)",
  "--bg-color-button-hover": "#1b85dbf3",
  "--bg-color-button-active": "#1b85dbf3",

  "--bg-color-card":"transparent", 
  "--bg-image-card": `url(${bgImageCardLight})`,
};

export const darkTheme = {
  "--color-text": "rgb(255, 255, 255)",

  "--color-text-header": "#ffffff",
  "--bg-color-header": "rgba(0, 0, 0, 0.76)",
  "--bg-image-header": `url(${bgDarkImage})`,

  "--bg-color-app": "#1a1a1a",
  "--bg-image-main-container": `url(${bgBodyDarkImage})`,

  "--bg-color-popup": "rgb(0, 0, 0)",
  "--bg-image-popup": `url(${bgPopupDark})`,

  "--bg-color-popup-finish-button": "#402377d5",
  "--text-color-popup-finish-button": "#fff",

  "--bg-color-button": "#202020fd",
  "--text-color-button": "#fff",
  "--bg-color-button-disabled": "#afafae81",
  "--bg-color-button-hover": "#000000e5",
  "--bg-color-button-active": "#000000e5",

  "--bg-color-card":"transparent", 
  "--bg-image-card": `url(${bgImageCardDark})`,
};