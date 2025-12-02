module.exports = {
  root: true,
  extends: ['devextreme/spell-check'],
  ignorePatterns: ['.eslintrc.cjs'], // Exclude this file from linting
  overrides: [{
    files: ['*.ts', '*.vue'],
    extends: [
      '@vue/eslint-config-typescript',
      'devextreme/vue'
    ],
    env: { es6: true },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      'createDefaultProgram': true,
      'ecmaVersion': 2020,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"]
    },
    globals: {
      System: false,
      AzureGateway: false,
      AzureFileSystem: false,
    },
  }]
};
