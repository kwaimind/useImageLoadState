# useImageLoad 🖼

## todo:

- make public
- add to npm
- create a codesandbox demo https://codesandbox.io/s/useimageload-e0g1h?file=/src/useImageLoad.tsx:0-1608

> A simple React hook for listening to image load/error states

`useImageLoad` is a reusable hook that listens for load and error events on given image, and returns their current state. This allows you to implement functionaility based on the image state without having to rewrite callbacks and event listeners each time.

## Features

- Lightweight < 400B
- Unsubscribes all event listeners when the hook is unmounted
- Written and typed with TypeScript

## Usage

```js
import useOnImageLoad from '../useOnImageLoad';

const image = 'https://www.fillmurray.com/460/300';
const { hasError, hasLoaded, isFetching } = useOnImageLoad(image);
```

## Return values

- `hasLoaded` - `boolean` - loading state of the image
- `hasError` - `boolean` - error state of the image
- `isFetching` - `boolean` - fetching state of the image
- `image` - `string` - the image original image url
