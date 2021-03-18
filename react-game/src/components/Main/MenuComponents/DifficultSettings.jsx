import React, { useEffect } from "react";
import { DifficultButtons } from '../../../constants/buttons';

const DifficultSettings = ({
  currentOptions,
  options,
  setOptions,
  chooseCurrentOption, 
  setField,
  field,
}) => {
  useEffect(() => {
    if(options.difficult === 12) {
      setField('field__easy');
    }
    if(options.difficult === 18) {
      setField('field__normal');
    }
    if(options.difficult === 24){
      setField('field__difficult');
    }

    const savedDifficult = JSON.stringify(options.difficult);
    localStorage.setItem('memorygamedifficult', savedDifficult);

    const savedField = JSON.stringify(field);
    localStorage.setItem('memoryfield', savedField);

  }, [options]);
  
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