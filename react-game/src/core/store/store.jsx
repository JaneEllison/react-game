import React, {useReducer} from 'react';

const initialState = {
  theme: 'dark',
  
};

export const Context = React.createContext({});

const reducer = (state = initialState, action) => {
  const {payload, type} = action;

  console.log('reducer', type, payload);

  switch (type) {
    case 'CHANGE_THEME':
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
    <Context.Provider value={{dispatch, state}}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;
