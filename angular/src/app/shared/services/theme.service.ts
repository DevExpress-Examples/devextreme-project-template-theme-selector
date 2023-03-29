import { currentTheme, getTheme, refreshTheme } from 'devextreme/viz/themes';
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
    storageKey = "themeViewerAngular";
    getTheme(){
        return window.localStorage[this.storageKey]
    }

    getThemeData(){
        return [
            { text: "Orange Light", value: "orange.light", ImageSrc: "assets/icons/Component1.svg"},
            { text: "Blue Light", value: "blue.light", ImageSrc: "assets/icons/Component2.svg" },
            { text: "Purple Light", value: "purple.light", ImageSrc: "assets/icons/Component3.svg" },
            { text: "Purple Dark", value: "purple.dark", ImageSrc: "assets/icons/Component4.svg" }
        ]
    }

    applyTheme(theme?: string) {
        let themeMarker = "dx.theme.material.";
            
        theme = theme || window.localStorage[this.storageKey] || "orange.light";

        for(let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            if(href) {
                let themeMarkerPosition = href.indexOf(themeMarker);
                if(themeMarkerPosition >= 0) {
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                    if (fileNamePart === theme) {
                        for (let i=0; i<styleSheet.cssRules.length;i++){
                            let cssRule = styleSheet.cssRules.item(i) as CSSStyleRule
                            if (cssRule?.selectorText === ".dx-theme-accent-as-text-color") {
                                document.documentElement.style.setProperty('--base-accent',cssRule.style.color)
                            }
                        }
                        
                    }
                    styleSheet.disabled = fileNamePart != theme;
                }
            }
        }
        let accent = theme?.substring(theme?.indexOf('.')+1)
        console.log(accent)
        if (accent === 'light') {
            document.documentElement.style.setProperty('--base-border-color',"#F3F3F3")
            document.documentElement.style.setProperty('--base-bg',"rgba(0, 0, 0, 0.16)")
            document.documentElement.style.setProperty('--icon-color',"rgba(0, 0, 0, 0.54)")
        } else {
            document.documentElement.style.setProperty('--base-border-color',"#464650")
            document.documentElement.style.setProperty('--base-bg',"rgba(255, 255, 255, 0.10)")
            document.documentElement.style.setProperty('--icon-color',"rgba(255, 255, 255, 0.87)")
        }
        for(let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            if(href) {
                let themeMarkerPosition = href.indexOf(themeMarker);
                if(themeMarkerPosition >= 0) {
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                        console.log(fileNamePart)
                    if (fileNamePart.includes('additional')) {
                        styleSheet.disabled = !(accent == fileNamePart.substring(fileNamePart.indexOf('.')+1))
                    }
                    //styleSheet.disabled = fileNamePart != theme;
                }
            }
        }


        
        window.localStorage[this.storageKey] = theme;
        currentTheme('material.' + theme);
        refreshTheme();
    }

    constructor() { }

}
