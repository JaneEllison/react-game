import { ThemeButtons } from '../../constants/buttons';

const ThemeSettings = ({
  currentOptions,
  setOptions,
  options,
  chooseCurrentOption,
}) => {
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