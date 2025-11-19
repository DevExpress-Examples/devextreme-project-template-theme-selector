import React, { useCallback, useMemo } from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box' 
import { useTheme } from '../../contexts/theme';
import './ThemeSelector.scss';


const TextBoxInputAttr = {class:'dx-theme-text-color theme-textbox' }
const DropDownOptions = {wrapperAttr: {class: 'selectboxDropdown'} }

const fieldRender = (data)=>{
  return ( 
  <div className={"custom-item"}>
    <img className={"theme-icon"} src={data.ImageSrc} />
    <TextBox
        width="80px"
        inputAttr={TextBoxInputAttr}
        value={data.text}
        readOnly={true}
      />
  </div>
)
}

const itemRender = (data)=>{
  return ( 
    <div className={"custom-item"}>
      <img className={"theme-icon"} src={data.ImageSrc} />
      <div className={"theme-text"}>
         {data.text} 
      </div>
    </div>
  )
}


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
        width="145px"
        stylingMode="outlined"
        fieldRender={fieldRender}
        itemRender={itemRender}
        deferRendering={false}
        dropDownOptions={DropDownOptions}
      ></SelectBox>
    </div>
  );
}
