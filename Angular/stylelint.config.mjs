import stylelintrc from 'eslint-config-devextreme/stylelintrc';

export default {
  extends: ['stylelint-config-standard-scss'],
  ...stylelintrc,
  ignoreFiles: ['src/themes/generated/**'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'at-rule-no-unknown': [true, { ignoreAtRules: ['use', 'forward'] }],
      },
    },
  ],
};
