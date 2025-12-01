module.exports = {
  root: true,
  extends: ['devextreme/spell-check'],
  overrides: [{
    files: ['*.ts', '*.html'],
    extends: ['devextreme/angular'],
    env: {
      browser: true,
      es6: true
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      'createDefaultProgram': true,
      'ecmaVersion': 6,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: true,
        bundledDependencies: false,
        packageDir: __dirname,
      }],
    },
  }]
};
