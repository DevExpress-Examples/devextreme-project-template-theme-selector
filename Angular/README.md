# The Angular specific part of Theme Selector implementation

Themes should be declared in the [angular.json](angular/angular.json) file. In this file, you should declare an asset folder where all icons are stored in SVG format. In the example below, you can see the optimization configuration for styles:

```
"styles": {
    "minify": true,
    "inlineCritical": false
},
```

This application uses file names to process Stylesheets, so you should not specify the `outputHashing` option (which changes CSS file names). In this example, we used `outputHashing: media`.

Usually, `variables.base.scss` and `variables.additional.scss` files are generated automatically. In this example, we had to configure them manually to redefine SCSS variables based on the CSS ones (we created the `variables.css` file to define the CSS variables). Unfortunately, a tool to generate such files does not exist. You need to configure the variables to apply custom styles to this example.

# AppName

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://v17.angular.io/cli) page.
