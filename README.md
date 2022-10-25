<!-- default badges list -->
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1109715)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->


# How to implement Theme Selector for the DevExtreme Project Template

The DevExtreme Project Template has two default themes: `base` and `swatch`. You can change the base theme to another Material theme at runtime. You can switch between themes using the StyleSheet API. For this, disable all loaded theme stylesheet links excluding the active one.

This sample demonstrates how to do this via a drop-down editor ([SelectBox](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxSelectBox/)) located in a header ([Toolbar](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxToolbar/)). The default Project Template also has several elements that don't apply theme CSS rules (font color, background color) automatically. For these elements, you can use our predefined [CSS classes](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/):

- [dx-theme-background-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-background-color)
- [dx-theme-text-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-text-color)

## Files to Look At

- **Angular**
    - [index.html](angular/src/index.html)
    - [theme.service.ts](angular/src/app/shared/services/theme.service.ts)
    - [theme-selector.component.ts](angular/src/app/shared/components/theme-selector/theme-selector.component.ts)
    - [theme-selector.component.html](angular/src/app/shared/components/theme-selector/theme-selector.component.html)
    - [app.component.ts](angular/src/app/app.component.ts)
    - [angular.json](angular/angular.json)
 - **Vue**
    - [theme-service.js](vue/src/services/theme-service.js)
    - [App.vue](vue/src/App.vue)
    - [theme-selector.vue](vue/src/components/theme-selector.vue)
    - [main.js](vue/src/main.js)
    - [public](vue/public)


## Documentation

- [Predefined Themes](https://js.devexpress.com/Documentation/Guide/Themes_and_Styles/Predefined_Themes/)
- [Project Template - Configure Themes](https://js.devexpress.com/Documentation/Guide/Angular_Components/Application_Template/#Configure_Themes)
