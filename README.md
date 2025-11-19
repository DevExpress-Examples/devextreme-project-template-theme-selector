<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/525731085/25.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1109715)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->

# Theme Switcher for DevExtreme - How to implement Theme Selector for the DevExtreme Project Template

The DevExtreme Project Template has two default themes: `base` and `swatch`. You can change the base theme to another Material theme at runtime. To switch between themes, use the StyleSheet API. For this, disable all loaded theme stylesheet links excluding the active one. 

The DevExtreme Project Template has several places where the SCSS variables used to change the color. To have the same color as main theme we use CSS variables and change them.

This sample demonstrates how to do this via a drop-down editor ([SelectBox](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxSelectBox/)) located in a header ([Toolbar](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxToolbar/)). The default Project Template also has several elements that don't apply theme CSS rules (font color, background color) automatically. For these elements, you can use our predefined [CSS classes](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/):

- [dx-theme-background-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-background-color)
- [dx-theme-text-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-text-color)

To generate swatch themes you can use ThemeBuilder CLI:

```
npx devextreme-cli build-theme --base-theme="material.blue.light" --output-file="theme.additional.light" --make-swatch --assetsBasePath="../../../node_modules/devextreme/dist/css" --output-color-scheme="additional"

npx devextreme-cli build-theme --base-theme="material.blue.dark" --output-file="theme.additional.dark" --make-swatch --assetsBasePath="../../../node_modules/devextreme/dist/css" --output-color-scheme="additional"
```

<div align="center"><img alt="Selector for DevExtreme - How to implement Theme Selector for the DevExtreme Project Template" src="images/theme-selector-for-template.png" /></div>

## Files to Review

- **Angular**
    - [index.html](Angular/src/index.html)
    - [theme.service.ts](Angular/src/app/shared/services/theme.service.ts)
    - [theme-selector.component.ts](Angular/src/app/shared/components/theme-selector/theme-selector.component.ts)
    - [theme-selector.component.html](Angular/src/app/shared/components/theme-selector/theme-selector.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [variables.css](Angular/src/themes/generated/variables.css)
    - [variables.base.scss](Angular/src/themes/generated/variables.base.scss)
    - [variables.additional.scss](Angular/src/themes/generated/variables.additional.scss)
    - [angular.json](Angular/angular.json)
 - **Vue**
    - [theme-service.js](Vue/src/services/theme-service.js)
    - [App.vue](Vue/src/App.vue)
    - [theme-selector.vue](Vue/src/components/theme-selector.vue)
    - [main.js](Vue/src/main.js)
    - [variables.css](Vue/src/themes/generated/variables.css)
    - [variables.base.scss](Vue/src/themes/generated/variables.base.scss)
    - [variables.additional.scss](Vue/src/themes/generated/variables.additional.scss)
    - [public](Vue/public)
 - **React**
    - [App.js](React/src/App.js)
    - [variables.css](React/src/themes/generated/variables.css)
    - [variables.base.scss](React/src/themes/generated/variables.base.scss)
    - [variables.additional.scss](React/src/themes/generated/variables.additional.scss)
    - [theme-constants.js](React/src/utils/theme-constants.js)
    - [theme.js](React/src/contexts/theme.js)
    - [ThemeSelector.js](React/src/components/theme-selector/ThemeSelector.js)
    - [public](React/public/)


## Documentation

- [Predefined Themes](https://js.devexpress.com/Documentation/Guide/Themes_and_Styles/Predefined_Themes/)
- [Project Template - Configure Themes](https://js.devexpress.com/Documentation/Guide/Angular_Components/Application_Template/#Configure_Themes)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-project-template-theme-selector&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-project-template-theme-selector&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
