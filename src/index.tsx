import { useState, useEffect, useCallback } from 'react';

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;

const useOnImageLoad = (imageSrc: string) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setHasLoaded(true);
    setHasError(false);
  }, []);

  useEffect(() => {
    const isValid = regex.test(imageSrc);
    if (!isValid) {
      handleError();
      return;
    }

    setIsFetching(true);
    const image = new Image();

    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);
    image.src = imageSrc;
    return () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
  }, [handleError, handleLoad, imageSrc]);

  return { hasLoaded, hasError, isFetching, image: imageSrc };
};

export default useOnImageLoad;
