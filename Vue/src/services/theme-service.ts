import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

export interface ThemeData {
  text: string;
  value: string;
  ImageSrc: string;
}

export type ThemeSwatchAccent = 'light' | 'dark';

const swatchColors = {
  light: {
    borderColor: '#F3F3F3',
    bg: 'rgba(0, 0, 0, 0.16)',
    iconColor: 'rgba(0, 0, 0, 0.54)',
  },
  dark: {
    borderColor: '#464650',
    bg: 'rgba(255, 255, 255, 0.1)',
    iconColor: 'rgba(255, 255, 255, 0.87)',
  },
};

export interface ThemeService {
  storageKey: string;
  getTheme(): string;
  getThemeData(): ThemeData[];
  applyBaseTheme(theme: string, themeMarker: string): void;
  applySwatchVariables(accent: ThemeSwatchAccent): void;
  applySwatchTheme(accent: ThemeSwatchAccent, themeMarker: string): void;
  applyTheme(theme?: string): void;
}

const themeService: ThemeService = {
  storageKey: 'themeViewer',

  getTheme(): string {
    return window.localStorage[this.storageKey];
  },

  getThemeData(): ThemeData[] {
    return [
      { text: 'Orange Light', value: 'orange.light', ImageSrc: '/icons/Component1.svg' },
      { text: 'Blue Light', value: 'blue.light', ImageSrc: '/icons/Component2.svg' },
      { text: 'Purple Light', value: 'purple.light', ImageSrc: '/icons/Component3.svg' },
      { text: 'Purple Dark', value: 'purple.dark', ImageSrc: '/icons/Component4.svg' }
    ];
  },

  applyBaseTheme(theme: string, themeMarker: string): void {
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
  },

  applySwatchVariables(accent: ThemeSwatchAccent): void {
    document.documentElement.style.setProperty('--base-border-color', swatchColors[accent].borderColor);
    document.documentElement.style.setProperty('--base-bg', swatchColors[accent].bg);
    document.documentElement.style.setProperty('--icon-color', swatchColors[accent].iconColor);
  },

  applySwatchTheme(accent: ThemeSwatchAccent, themeMarker: string): void {
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
  },

  applyTheme(theme?: string): void {
    const selectedTheme = theme || window.localStorage[this.storageKey] || 'orange.light';
    this.applyBaseTheme(selectedTheme, 'material.');
    const accent: ThemeSwatchAccent = selectedTheme.substring(selectedTheme.indexOf('.') + 1) as ThemeSwatchAccent;
    this.applySwatchVariables(accent);
    this.applySwatchTheme(accent, 'theme.additional');
    window.localStorage[this.storageKey] = selectedTheme;
    currentTheme(`'material.'${selectedTheme}`);
    refreshTheme();
  }
};

export default themeService;
