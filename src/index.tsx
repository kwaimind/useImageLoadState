import { useState, useEffect, useCallback } from 'react';

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
