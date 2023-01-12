import React, { useCallback, useMemo } from 'react';
import SelectBox from 'devextreme-react/select-box';
import { useTheme } from '../../contexts/theme';

export function ThemeSelector() {
  const { getTheme, getThemeData, setTheme } = useTheme();
  const themes = getThemeData();
  const currentTheme = getTheme();
  let onValueChanged = useCallback((e) => {
    setTheme(e.value)
  }, [setTheme]);
  return (
    <div className={'theme-selector'}>
      <SelectBox
        items={themes}
        value={currentTheme}
        valueExpr="value"
        displayExpr="text"
        onValueChanged={onValueChanged}
      ></SelectBox>
    </div>
  );
}
