import { DifficultButtons } from '../../constants/buttons';

const DifficultSettings = ({
  currentOptions,
  options,
  setOptions,
  chooseCurrentOption,
}) => {

  return (
    <div className='difficulty__container'>
      <h3>Choose a difficulty:</h3>
      <div className="difficult__buttons">
        {
          DifficultButtons.map((button) => (
            <button
              key={button.id}
              className={
                currentOptions.currentDifficult === button.text
                ? "difficult__button active"
                : "difficult__button"
              }
              onClick={(event) => {
                setOptions({
                  ...options,
                  difficult: button.value,
                });
                chooseCurrentOption(event);
              }}
            >
            {button.text}
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default DifficultSettings;