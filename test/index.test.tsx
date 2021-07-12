import { renderHook } from '@testing-library/react-hooks';
import useImageLoadState from '../src';

describe('useImageLoadState', () => {
  const LOAD_SUCCESS_SRC = 'https://www.fillmurray.com/460/300';
  const LOAD_FAILURE_SRC = 'https://www.fillmurray.com/error';

  const mockAddEventListener = jest.fn((_event, cb) => cb());
  const mockRemoveEventListener = jest.fn((_event, cb) => cb());

  const originalAdd = global.HTMLImageElement.prototype.addEventListener;
  const originalRemove = global.HTMLImageElement.prototype.removeEventListener;

  beforeEach(() => {
    global.HTMLImageElement.prototype.removeEventListener = mockRemoveEventListener;
    Object.defineProperty(global.HTMLImageElement.prototype, 'src', {
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          setTimeout(() => this.dispatchEvent(new Event('error')));
        } else if (src === LOAD_SUCCESS_SRC) {
          setTimeout(() => this.dispatchEvent(new Event('load')));
        }
      },
    });
  });

  afterEach(() => {
    global.HTMLImageElement.prototype.removeEventListener = originalRemove;
  });

  it('should trigger the initial fetch', () => {
    const { result } = renderHook(() => useImageLoadState(LOAD_SUCCESS_SRC));
    expect(result.current).toEqual({
      hasError: false,
      hasLoaded: false,
      isFetching: true,
      image: LOAD_SUCCESS_SRC,
    });
  });
  it('should add event listeners on mount', () => {
    global.HTMLImageElement.prototype.addEventListener = mockAddEventListener;
    renderHook(() => useImageLoadState(LOAD_SUCCESS_SRC));
    expect(mockAddEventListener).toHaveBeenCalled();
    global.HTMLImageElement.prototype.addEventListener = originalAdd;
  });
  it('should remove event listeners on unmount', () => {
    const { unmount } = renderHook(() => useImageLoadState(LOAD_SUCCESS_SRC));
    expect(mockRemoveEventListener).not.toHaveBeenCalled();
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
  it('should return hasLoaded true if the fetch was successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoadState(LOAD_SUCCESS_SRC)
    );
    await waitForNextUpdate();
    expect(result.current).toEqual({
      hasError: false,
      hasLoaded: true,
      isFetching: false,
      image: LOAD_SUCCESS_SRC,
    });
  });
  it('should return an error if something has gone wrong', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoadState(LOAD_FAILURE_SRC)
    );
    await waitForNextUpdate();
    expect(result.current).toEqual({
      hasError: true,
      hasLoaded: false,
      isFetching: true,
      image: LOAD_FAILURE_SRC,
    });
  });
  it('should not work with invalid urls', () => {
    const image = '/460/300';
    const { result } = renderHook(() => useImageLoadState(image));
    expect(result.current).toEqual({
      hasError: true,
      hasLoaded: false,
      isFetching: false,
      image,
    });
  });
});
