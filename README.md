<!-- default badges list -->
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1109715)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->

# Theme Switcher for DevExtreme - Implement a Theme Switcher within the DevExtreme Application Template

This example demonstrates runtime theme switching in our Application Templates. You can use a DevExtreme [SelectBox](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxSelectBox/) within the application to switch between available themes.

DevExtreme Application Templates include two default themes: `base` and `swatch`. These templates also implement SCSS variables to change theme colors.

To switch between themes, use StyleSheet APIs to disable all loaded `base`/`swatch` stylesheets (excluding the active stylesheet) and update SCSS variables. Refer to the following files to review framework-specific implementations:
- [Angular Theme Service](Angular/src/app/shared/services/theme.service.ts)
- [Vue Theme Service](Vue/src/services/theme-service.ts)
- [React Theme Service](React/src/contexts/theme.tsx)

This example also uses our predefined [CSS classes](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/) to customize elements outside of DevExtreme components:

- [dx-theme-background-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-background-color)
- [dx-theme-text-color](https://js.devexpress.com/Documentation/ApiReference/UI_Components/CSS_Classes/#dx-theme-text-color)

## Add Themes to the Theme Switcher
1) Add theme metadata JSON files to `src/themes`. For additional information on theme metadata files, refer to the following help topic: [Export Theme Metadata](https://js.devexpress.com/React/Documentation/Guide/Common/DevExtreme_CLI/#ThemeBuilder/Export_Theme_Metadata).
2) Add new metadata files to the command list in **devextreme.json** (as `build-theme` commands).
3) Execute the following command: `npm run build-themes`. This command uses our [ThemeBuilder CLI](https://js.devexpress.com/Documentation/Guide/Common/DevExtreme_CLI/#ThemeBuilder) to generate theme files. You can find these files in the `outputFile` directory (specified in **devextreme.json**).
4) Add links to new themes in **index.html**.
5) _For base themes only._ Add new entries to the `getThemeData` array within the theme service. The theme switcher SelectBox uses this array as a data source.

This example implements two swatch themes (light and dark). To switch between three or more swatch themes, extend the `applySwatchTheme` method in the theme service.

You can also generate theme files using our ThemeBuilder CLI. The following commands generate light and dark swatch themes:
```
npx devextreme-cli build-theme --base-theme="material.blue.light" --output-file="theme.additional.light" --make-swatch --assetsBasePath="../../../node_modules/devextreme/dist/css" --output-color-scheme="additional"

npx devextreme-cli build-theme --base-theme="material.blue.dark" --output-file="theme.additional.dark" --make-swatch --assetsBasePath="../../../node_modules/devextreme/dist/css" --output-color-scheme="additional"
```

<div align="center"><img alt="Theme Switcher for DevExtreme - How to Implement a Theme Switcher in the DevExtreme Application Template" src="images/theme-selector-for-template.png" /></div>

## Files to Review

- **Angular**
    - [index.html](Angular/src/index.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [app.component.html](Angular/src/app/app.component.html)
    - [theme.service.ts](Angular/src/app/shared/services/theme.service.ts)
    - [theme-selector.component.ts](Angular/src/app/shared/components/theme-selector/theme-selector.component.ts)
    - [theme-selector.component.html](Angular/src/app/shared/components/theme-selector/theme-selector.component.html)
    - [variables.base.scss](Angular/src/themes/variables.base.scss)
    - [variables.additional.scss](Angular/src/themes/variables.additional.scss)
    - [angular.json](Angular/angular.json)
 - **Vue**
    - [App.vue](Vue/src/App.vue)
    - [theme-service.ts](Vue/src/services/theme-service.ts)
    - [theme-selector.vue](Vue/src/components/theme-selector.vue)
    - [main.ts](Vue/src/main.ts)
    - [variables.base.scss](Vue/src/themes/variables.base.scss)
    - [variables.additional.scss](Vue/src/themes/variables.additional.scss)
    - [public](Vue/public)
 - **React**
    - [App.tsx](React/src/App.tsx)
    - [variables.base.scss](React/src/themes/variables.base.scss)
    - [variables.additional.scss](React/src/themes/variables.additional.scss)
    - [theme-constants.ts](React/src/utils/theme-constants.ts)
    - [theme.tsx](React/src/contexts/theme.tsx)
    - [ThemeSelector.tsx](React/src/components/theme-selector/ThemeSelector.tsx)
    - [public](React/public/)


## Documentation

- [Predefined Themes](https://js.devexpress.com/Documentation/Guide/Themes_and_Styles/Predefined_Themes/)
- [Project Template - Configure Themes](https://js.devexpress.com/Documentation/Guide/Angular_Components/Application_Template/#Configure_Themes)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-project-template-theme-selector&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-project-template-theme-selector&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
