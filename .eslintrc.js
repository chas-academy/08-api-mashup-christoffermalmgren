module.exports = {
  extends: ['prettier', 'prettier/flowtype'],
  rules: {
    "prettier/prettier": ["error"],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off'
  },
  env: {
    browser: true,
  },
  plugins: ["prettier"],
  globals: {},
};