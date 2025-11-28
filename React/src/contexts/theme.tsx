import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';
import {
  storageKey,
  baseThemeMarker,
  additionalThemeMarker,
  swatchColors,
} from '../utils/theme-constants';
import type { ThemeContextType, ThemeData, ThemeSwatchAccent } from '../types';

function getThemeData(): ThemeData[] {
  return [
    { text: 'Orange Light', value: 'orange.light', ImageSrc: '/icons/Component1.svg' },
    { text: 'Blue Light', value: 'blue.light', ImageSrc: '/icons/Component2.svg' },
    { text: 'Purple Light', value: 'purple.light', ImageSrc: '/icons/Component3.svg' },
    { text: 'Purple Dark', value: 'purple.dark', ImageSrc: '/icons/Component4.svg' },
  ];
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

function useTheme(): ThemeContextType {
  return useContext<ThemeContextType>(ThemeContext);
}

function ThemeProvider({ theme, ...props }: React.PropsWithChildren<{ theme?: string }>): JSX.Element {
  const [_theme, setTheme] = useState(theme);

  const getTheme = useCallback(
    () => _theme ?? window.localStorage[storageKey] as string ?? 'orange.light',
    [_theme],
  );

  const applyBaseTheme = useCallback((theme: string, themeMarker: string) => {
    for (const styleSheet of document.styleSheets) {
      const href = styleSheet.href;
      if (href) {
        const themeMarkerPosition: number = href.indexOf(themeMarker);
        if (themeMarkerPosition >= 0) {
          const startPosition = themeMarkerPosition + themeMarker.length;
          const endPosition = href.indexOf('.css');
          const fileNamePart = href.substring(startPosition, endPosition);
          if (fileNamePart === theme) {
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
              const cssRule = styleSheet.cssRules.item(i) as CSSStyleRule;
              if (cssRule?.selectorText === '.dx-theme-accent-as-text-color') {
                document.documentElement.style.setProperty('--base-accent', cssRule.style.color);
              }
              if (cssRule?.selectorText === '.dx-theme-text-color') {
                document.documentElement.style.setProperty('--base-text-color', cssRule.style.color);
              }
            }
          }
          styleSheet.disabled = fileNamePart != theme;
        }
      }
    }
  }, []);

  const applySwatchVariables = useCallback((accent: ThemeSwatchAccent) => {
    document.documentElement.style.setProperty('--base-border-color', swatchColors[accent].borderColor);
    document.documentElement.style.setProperty('--base-bg', swatchColors[accent].bg);
    document.documentElement.style.setProperty('--icon-color', swatchColors[accent].iconColor);
  }, []);

  const applySwatchTheme = useCallback((accent: ThemeSwatchAccent, themeMarker: string) => {
    for (const styleSheet of document.styleSheets) {
      const href = styleSheet.href;
      if (href) {
        const themeMarkerPosition: number = href.indexOf(themeMarker);
        if (themeMarkerPosition >= 0) {
          const startPosition = themeMarkerPosition + themeMarker.length;
          const endPosition = href.indexOf('.css');
          const fileNamePart = href.substring(startPosition, endPosition);
          styleSheet.disabled = !(accent === fileNamePart.substring((fileNamePart.indexOf('.') as number) + 1));
        }
      }
    }
  }, []);

  const applyTheme = useCallback(() => {
    const theme = getTheme();
    applyBaseTheme(theme, baseThemeMarker);
    const accent = theme?.substring(theme.indexOf('.') + 1) as ThemeSwatchAccent;
    applySwatchVariables(accent);
    applySwatchTheme(accent, additionalThemeMarker);
    window.localStorage[storageKey] = theme;
    currentTheme(`'material.'${theme}`);
    refreshTheme();
  }, [getTheme]);

  useEffect(() => {
    applyTheme();
  }, [_theme, applyTheme]);

  const themeContextValue = useMemo<ThemeContextType>(() => ({
    getThemeData,
    getTheme,
    setTheme,
  }), [getThemeData, getTheme, setTheme]);

  return (
    <ThemeContext.Provider
      value={themeContextValue}
      {...props}
    />
  );
}

export {
  ThemeProvider,
  useTheme,
};
