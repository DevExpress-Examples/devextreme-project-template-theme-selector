import { currentTheme, getTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

    getTheme(){
        return window.localStorage["salesViewerTheme"]
    }

    getThemeData(){
        return [
            { text: "Orange Light", value: "orange.light"},
            { text: "Blue Light", value: "blue.light" },
            { text: "Purple Light", value: "purple.light" },
            { text: "Purple Dark", value: "purple.dark" }
        ]
    }

    applyTheme(theme?: string) {
        let themeMarker = "dx.theme.material.",
            storageKey = "salesViewerTheme";
        theme = theme || window.localStorage[storageKey] || "orange.light";

        for(let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            if(href) {
                let themeMarkerPosition = href.indexOf(themeMarker);
                if(themeMarkerPosition >= 0) {
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                    styleSheet.disabled = fileNamePart != theme;
                }
            }
        }
        
        window.localStorage[storageKey] = theme;
        currentTheme('material.' + theme);
        refreshTheme();
    }

    constructor() { }

}
