import { useEffect, useCallback, useReducer } from 'react';
import { StateType, ActionType } from './types';
import { ERROR, FETCHING, LOAD, LOADING } from './constants';

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const initialState = {
  hasLoaded: false,
  hasError: false,
  isFetching: false,
  image: '',
};

const reducer = (state: StateType, { type, image = '' }: ActionType) => {
  switch (type) {
    case ERROR:
      return { ...state, hasError: true, image };
    case FETCHING:
      return { ...initialState, isFetching: true, image };
    case LOADING:
      return { ...state, isFetching: false, hasLoaded: true };
    default:
      return state;
  }
};

const useOnImageLoad = (imageSrc: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleError = useCallback(() => {
    dispatch({ type: ERROR, image: imageSrc });
  }, [imageSrc]);

  const handleLoad = useCallback(() => {
    dispatch({ type: LOADING });
  }, []);

  useEffect(() => {
    const isValid = regex.test(imageSrc);
    if (!isValid) {
      handleError();
      return undefined;
    }

    dispatch({ type: FETCHING, image: imageSrc });
    const image = new Image();

    image.addEventListener(LOAD, handleLoad);
    image.addEventListener(ERROR, handleError);
    image.src = imageSrc;
    return () => {
      image.removeEventListener(LOAD, handleLoad);
      image.removeEventListener(ERROR, handleError);
    };
  }, [handleError, handleLoad, imageSrc]);

  return state;
};

export default useOnImageLoad;
