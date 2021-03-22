import React, { useEffect, useCallback } from "react";
import useStore from '../../../core/store/useStore';

import { DifficultButtons } from '../../../constants/buttons';

const DifficultSettings = ({
  setField,
  field,
}) => {

  const {dispatch, state} = useStore();

  const changeDifficulty = useCallback((value) => {
    dispatch({
      type: 'CHANGE_DIFFICULTY',
      payload: {difficulty: value},
    });
  });

  useEffect(() => {
    if(state.difficult === 12) {
      setField('field__easy');
    }
    if(state.difficult === 18) {
      setField('field__normal');
    }
    if(state.difficult === 24){
      setField('field__difficult');
    }

    // const savedDifficult = JSON.stringify(state.difficult);
    // localStorage.setItem('memorygamedifficult', savedDifficult);

    // const savedField = JSON.stringify(field);
    // localStorage.setItem('memoryfield', savedField);
  }, [state.difficult]);
  
  return (
    <div className='difficulty__container'>
      <h3>Choose a difficulty:</h3>
      <div className="difficult__buttons">
        {
          DifficultButtons.map((button) => (
            <button
              key={button.id}
              className={
                state.difficulty === button.value
                ? "difficult__button active"
                : "difficult__button"
              }
              onClick={() => changeDifficulty(button.value)}
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