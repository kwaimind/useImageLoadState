# useImageLoad 🖼

> A simple React hook for listening to image load/error states

Built in Typescript with RxJS. `useImageLoad` listens for load and error events on the image class and returns their current state. RxJS unsubscribes all event listeners when the hook is unmounted.

## Usage

```js
import useOnImageLoad from '../useOnImageLoad';

const image = 'https://www.fillmurray.com/460/300';
const { hasError, hasLoaded, isFetching } = useOnImageLoad(image);

// {
//  hasError: false,
//  hasLoaded: true,
//  isFetching: true,
// }
```

## Return values

- `hasLoaded` - `boolean` - loading state of the image
- `hasError` - `boolean` - error state of the image
- `isFetching` - `boolean` - fetching state of the image
- `image` - `string` - the image original image url
