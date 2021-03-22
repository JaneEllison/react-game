import React, { useReducer } from 'react';

const initialState = {
  theme: 'dark',
  difficulty: '18',
  cardTheme: 'stars',


};

export const Context = React.createContext({});

const reducer = (state = initialState, action) => {
  const { payload, type } = action;

  console.log('reducer', type, payload);

  switch (type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: payload.theme,
      };
    case 'CHANGE_DIFFICULTY':
      return {
        ...state,
        difficulty: payload.difficulty,
      };
    case 'CHANGE_CARD_THEME':
      return {
        ...state,
        cardTheme: payload.cardTheme,
      };
    case 'CHANGE_CURRENT_IMAGES':
      return {
        ...state,
        theme: payload.theme,
      };


    default:
      return state;
  }
};

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ dispatch, state }}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;
