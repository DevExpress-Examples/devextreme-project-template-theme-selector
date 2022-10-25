import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

export default {
    storageKey: "themeViewerAngular",
    
    getTheme(){
        return window.localStorage[this.storageKey]
    },

    getThemeData(){
        return [
            { text: "Orange Light", value: "orange.light"},
            { text: "Blue Light", value: "blue.light" },
            { text: "Purple Light", value: "purple.light" },
            { text: "Purple Dark", value: "purple.dark" }
        ]
    },

    applyTheme(theme) {
        let themeMarker = "dx.material.";
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
                    styleSheet.disabled = fileNamePart != theme;
                }
            }
        }
        
        window.localStorage[this.storageKey] = theme;
        currentTheme('material.' + theme);
        refreshTheme();
    }

}