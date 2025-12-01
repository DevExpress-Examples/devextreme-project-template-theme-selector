import { useCallback } from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import { useTheme } from '../../contexts/theme';
import './ThemeSelector.scss';
import type { ThemeData } from '../../types';

const TextBoxInputAttr = { class: 'dx-theme-text-color theme-textbox' };
const DropDownOptions = { wrapperAttr: { class: 'selectbox-dropdown' } };

function fieldRender(data: ThemeData): JSX.Element {
  return (
    <div className="custom-item">
      <img className="theme-icon" src={data.ImageSrc} alt={data.text} />
      <TextBox
        width="80px"
        inputAttr={TextBoxInputAttr}
        value={data.text}
        readOnly={true}
      />
    </div>
  );
}

function itemRender(data: ThemeData): JSX.Element {
  return (
    <div className="custom-item">
      <img className="theme-icon" src={data.ImageSrc} alt={data.text} />
      <div className="theme-text">
        {data.text}
      </div>
    </div>
  );
}

export function ThemeSelector(): JSX.Element {
  const { getTheme, getThemeData, setTheme } = useTheme();
  const themes = getThemeData();
  const currentTheme = getTheme();
  const onValueChanged = useCallback((e: any) => {
    setTheme(e.value);
  }, [setTheme]);
  return (
    <div className='theme-selector'>
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
