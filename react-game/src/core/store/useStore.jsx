import {useContext} from 'react';
import {Context} from './store';

const useStore = () => {
  const {dispatch, state} = useContext(Context);

  return {
    dispatch,
    state,
  };
};

export default useStore;
