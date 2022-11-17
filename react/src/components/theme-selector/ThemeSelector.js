import React, { useMemo } from 'react';
import SelectBox from 'devextreme-react/select-box';
import ThemeService from '../../utils/theme-service'


export default function ThemeSelector() {
  let themes = ThemeService.getThemeData()
  let currentTheme = ThemeService.getTheme()

  let onValueChanged = (e)=>{
    ThemeService.applyTheme(e.value)
  }
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
