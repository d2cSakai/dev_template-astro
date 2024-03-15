/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  jsxSingleQuote: false,
  arrowParens: 'always',
  printWidth: 120,
  bracketSpacing: true,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
