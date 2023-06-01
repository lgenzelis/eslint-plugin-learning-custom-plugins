module.exports = {
  rules: {
    'no-empty-catch': require('./no-empty-catch.js'),
    'no-unnecessary-back-ticks': require('./no-unnecessary-back-ticks.js'),
    'no-untranslated-text': require('./no-untranslated-text.js'),
    'no-variables-in-t-tagged-template': require('./no-variables-in-t-tagged-template.js'),
    'no-variables-mismatch-in-t-function-call': require('./no-variables-mismatch-in-t-function-call.js'),
  },
  configs: {
    recommended: {
      plugins: ['@lgenzelis/learning-custom-plugins'],
      rules: {
        '@lgenzelis/learning-custom-plugins/no-untranslated-text': 'error',
        '@lgenzelis/learning-custom-plugins/no-variables-in-t-tagged-template': 'error',
        '@lgenzelis/learning-custom-plugins/no-variables-mismatch-in-t-function-call': 'error',
      },
    },
  },
};
