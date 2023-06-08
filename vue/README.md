# The Vue specific part of Theme Selector implementation

The [variables.css](vue/src/themes/generated/variables.css) should be declared in [main.js](vue/src/main.js) file. 
The following configuration row should be deleted: `"postinstall": "npm run build-themes"` from [package.json](vue/package.json) 
Themes and icons should be added to [public](vue/public) folder. Themes should be imported in [index.html](vue/public/index.html) using the following syntax:
```
<link rel="stylesheet" crossorigin="anonymous" href="<%= BASE_URL %>dx.material.orange.light.css"> 
```

# app-name

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
