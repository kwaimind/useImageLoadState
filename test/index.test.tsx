import useImageLoad from '../src';
import { renderHook } from '@testing-library/react-hooks';

describe('it', () => {
  const LOAD_SUCCESS_SRC = 'https://www.fillmurray.com/460/300';
  const LOAD_FAILURE_SRC = 'https://www.fillmurray.com/error';

  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set: function(src) {
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.dispatchEvent(new Event('error')));
        } else if (src === LOAD_SUCCESS_SRC) {
          setTimeout(() => this.dispatchEvent(new Event('load')));
        }
      },
    });
  });

  it('should trigger the initial fetch', () => {
    const { result } = renderHook(() => useImageLoad(LOAD_SUCCESS_SRC));
    expect(result.current).toEqual({
      hasError: false,
      hasLoaded: false,
      isFetching: true,
      image: LOAD_SUCCESS_SRC,
    });
  });
  it('should trigger the initial fetch', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoad(LOAD_SUCCESS_SRC)
    );
    await waitForNextUpdate();
    expect(result.current).toEqual({
      hasError: false,
      hasLoaded: true,
      isFetching: true,
      image: LOAD_SUCCESS_SRC,
    });
  });
  it('should return an error if something has gone wrong', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoad(LOAD_FAILURE_SRC)
    );
    await waitForNextUpdate();
    expect(result.current).toEqual({
      hasError: true,
      hasLoaded: false,
      isFetching: true,
      image: LOAD_FAILURE_SRC,
    });
  });
});
