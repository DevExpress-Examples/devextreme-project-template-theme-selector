import { useState, useCallback, useEffect } from 'react';

interface ScreenSize {
  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());
  const onSizeChanged = useCallback(() => {
    setScreenSize(getScreenSize());
  }, []);

  useEffect(() => {
    subscribe(onSizeChanged);

    return () => {
      unsubscribe(onSizeChanged);
    };
  }, [onSizeChanged]);

  return screenSize;
}

export function useScreenSizeClass(): string {
  const screenSize = useScreenSize();

  if (screenSize.isLarge) {
    return 'screen-large';
  }

  if (screenSize.isMedium) {
    return 'screen-medium';
  }

  if (screenSize.isSmall) {
    return 'screen-small';
  }

  return 'screen-x-small';
}

let handlers: Function[] = [];
const xSmallMedia = window.matchMedia('(max-width: 599.99px)');
const smallMedia = window.matchMedia('(min-width: 600px) and (max-width: 959.99px)');
const mediumMedia = window.matchMedia('(min-width: 960px) and (max-width: 1279.99px)');
const largeMedia = window.matchMedia('(min-width: 1280px)');

[xSmallMedia, smallMedia, mediumMedia, largeMedia].forEach((media) => {
  media.addEventListener('change', (e) => {
    e.matches && handlers.forEach((handler) => { handler(); });
  });
});

function subscribe(handler: Function): void {
  handlers.push(handler);
}

function unsubscribe(handler: Function): void {
  handlers = handlers.filter((item) => item !== handler);
}

function getScreenSize(): ScreenSize {
  return {
    isXSmall: xSmallMedia.matches,
    isSmall: smallMedia.matches,
    isMedium: mediumMedia.matches,
    isLarge: largeMedia.matches,
  };
}
