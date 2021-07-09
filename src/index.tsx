import { useState, useEffect, useCallback } from 'react';
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

// Originally taken from https://typesafe.blog/article/fetch-images-with-a-react-hook
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

    const onLoad = fromEvent(image, 'load').pipe(map(handleLoad));
    const onError = fromEvent(image, 'error').pipe(map(handleError));
    const allEvents = merge(onLoad, onError);

    const subscribe = allEvents.subscribe();
    image.src = imageSrc;
    return () => subscribe.unsubscribe();
  }, [handleError, handleLoad, imageSrc]);

  return { hasLoaded, hasError, isFetching };
};

export default useOnImageLoad;
