import { currentTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';

export interface ThemeData {
  text: string;
  value: string;
  ImageSrc: string;
}

type ThemeSwatchAccent = 'light' | 'dark';

@Injectable()
export class ThemeService {
  themeMarker = 'dx.theme.material.';

  storageKey = 'themeViewerAngular';

  swatchColors = {
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

  getTheme(): string {
    return window.localStorage[this.storageKey] as string;
  }

  getThemeData(): ThemeData[] {
    return [
      { text: 'Orange Light', value: 'orange.light', ImageSrc: 'assets/icons/Component1.svg' },
      { text: 'Blue Light', value: 'blue.light', ImageSrc: 'assets/icons/Component2.svg' },
      { text: 'Purple Light', value: 'purple.light', ImageSrc: 'assets/icons/Component3.svg' },
      { text: 'Purple Dark', value: 'purple.dark', ImageSrc: 'assets/icons/Component4.svg' },
    ];
  }

  applyThemeColorVariables(styleSheet: CSSStyleSheet): void {
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const cssRule = styleSheet.cssRules.item(i) as CSSStyleRule;
      if (cssRule?.selectorText === '.dx-theme-accent-as-text-color') {
        document.documentElement.style.setProperty('--base-accent', cssRule.style.color);
      }
    }
  }

  applyBaseTheme(theme?: string): void {
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];
      const href = styleSheet.href;
      if (href) {
        const themeMarkerPosition: number = href.indexOf(this.themeMarker);
        if (themeMarkerPosition >= 0) {
          const startPosition = themeMarkerPosition + this.themeMarker.length;
          const endPosition = href.indexOf('.css');
          const fileNamePart = href.substring(startPosition, endPosition);
          if (fileNamePart === theme) {
            for (let j = 0; j < styleSheet.cssRules.length; j++) {
              const cssRule = styleSheet.cssRules.item(j) as CSSStyleRule;
              if (cssRule?.selectorText === '.dx-theme-accent-as-text-color') {
                document.documentElement.style.setProperty('--base-accent', cssRule.style.color);
              }
              if (cssRule?.selectorText === '.dx-theme-text-color') {
                document.documentElement.style.setProperty('--base-text-color', cssRule.style.color);
              }
            }
          }
          styleSheet.disabled = fileNamePart !== theme;
        }
      }
    }
  }

  applySwatchVariables(accent: ThemeSwatchAccent): void {
    document.documentElement.style.setProperty('--base-border-color', this.swatchColors[accent].borderColor);
    document.documentElement.style.setProperty('--base-bg', this.swatchColors[accent].bg);
    document.documentElement.style.setProperty('--icon-color', this.swatchColors[accent].iconColor);
  }

  applySwatchTheme(accent: ThemeSwatchAccent): void {
    for (let i = 0; i < document.styleSheets.length; i++) {
      const styleSheet = document.styleSheets[i];
      const href = styleSheet.href;
      if (href) {
        const themeMarkerPosition: number = href.indexOf(this.themeMarker);
        if (themeMarkerPosition >= 0) {
          const startPosition = themeMarkerPosition + this.themeMarker.length;
          const endPosition = href.indexOf('.css');
          const fileNamePart = href.substring(startPosition, endPosition);
          if (fileNamePart.includes('additional')) {
            styleSheet.disabled = !(accent === fileNamePart.substring(fileNamePart.indexOf('.') + 1));
          }
        }
      }
    }
  }

  applyTheme(theme?: string): void {
    const selectedTheme = theme ?? (window.localStorage[this.storageKey] as string) ?? 'orange.light';
    this.applyBaseTheme(selectedTheme);

    const dotIndex = selectedTheme.indexOf('.');
    const accent = (dotIndex >= 0 ? selectedTheme.substring(dotIndex + 1) : 'light') as ThemeSwatchAccent;
    this.applySwatchVariables(accent);
    this.applySwatchTheme(accent);

    window.localStorage[this.storageKey] = selectedTheme;
    currentTheme(`material.${selectedTheme}`);
    refreshTheme();
  }
}
