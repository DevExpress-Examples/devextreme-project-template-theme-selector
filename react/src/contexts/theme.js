import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';
import { storageKey, themeMarker } from '../utils/theme-constants';


const getThemeData = () => ([
    { text: "Orange Light", value: "orange.light" },
    { text: "Blue Light", value: "blue.light" },
    { text: "Purple Light", value: "purple.light" },
    { text: "Purple Dark", value: "purple.dark" }
]);

const ThemeContext = createContext({});
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ theme, ...props }) {

    const [_theme, setTheme] = useState(theme);

    const getTheme = useCallback(() => _theme || window.localStorage[storageKey] || "orange.light", 
    [_theme]);

    const applyTheme = useCallback((theme) => {
        theme = getTheme();
        for (let index in document.styleSheets) {
            let styleSheet = document.styleSheets[index],
                href = styleSheet.href;
            if (href) {
                let themeMarkerPosition = href.indexOf(themeMarker);
                if (themeMarkerPosition >= 0) {
                    let startPosition = themeMarkerPosition + themeMarker.length,
                        endPosition = href.indexOf(".css"),
                        fileNamePart = href.substring(startPosition, endPosition);
                    styleSheet.disabled = fileNamePart !== theme;
                }
            }
        }
        window.localStorage[storageKey] = theme;
        currentTheme('material.' + theme);
        refreshTheme();
    }, [getTheme]);

    useEffect(() => {
        applyTheme(_theme);
    }, [_theme, applyTheme])

    return (
        <ThemeContext.Provider
            value={{ getThemeData, getTheme, setTheme }}
            {...props}
        />
    );
}

export {
    ThemeProvider,
    useTheme
}




