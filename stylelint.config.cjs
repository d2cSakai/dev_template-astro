module.exports = {
  syntax: 'scss',
  extends: ['stylelint-config-recess-order'],
  rules: {
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
  },
  overrides: [
    {
      files: ['*.astro', '**/*.astro'],

      // `*.astro` では postcss-html を指定しないとシンタックスエラーになってしまう
      customSyntax: 'postcss-html',
    },
  ],
};
