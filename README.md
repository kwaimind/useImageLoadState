# useImageLoadState 🖼

[![bundlephobia](https://img.shields.io/bundlephobia/minzip/useimageloadstate?style=flat-square)](https://bundlephobia.com/package/useimageloadstate) [![npm version](https://img.shields.io/npm/v/useimageloadstate?style=flat-square)](https://www.npmjs.com/package/useimageloadstate) 

> A simple React hook for listening to image load/error states

`useImageLoadState` is a reusable hook that listens for load and error events on given image, and returns their current state. This allows you to implement functionaility based on the image state without having to rewrite callbacks and event listeners each time.

## Features

- Lightweight < 468B
- Unsubscribes all event listeners when the hook is unmounted
- Written and typed with TypeScript

## Usage

```js
import useImageLoadState from "useimageloadstate";

const image = 'https://www.fillmurray.com/460/300';
const { hasLoaded, hasError, isFetching } = useImageLoadState(image);
```

## Return values

- `hasLoaded` - `boolean` - loading state of the image
- `hasError` - `boolean` - error state of the image
- `isFetching` - `boolean` - fetching state of the image
- `image` - `string` - the image original image url
