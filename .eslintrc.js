module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'plugin:n/recommended'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
  },
};
