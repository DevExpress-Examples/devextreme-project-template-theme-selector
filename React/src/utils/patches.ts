import { useState, useCallback } from 'react';
import { useScreenSize } from './media-query';

export function useMenuPatch(): [string, () => void] {
  const { isSmall, isMedium } = useScreenSize();
  const [enabled, setEnabled] = useState(isSmall || isMedium);
  const onMenuReady = useCallback(() => {
    if (!enabled) {
      return;
    }

    setTimeout(() => setEnabled(false));
  }, [enabled]);

  return [enabled ? 'pre-init-blink-fix' : '', onMenuReady];
}
