const { RuleTester } = require('eslint');
const noUnnecessaryTFunctionCall = require('./no-unnecessary-t-function-call');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 'latest' } });

ruleTester.run('no-unnecessary-t-function-call', noUnnecessaryTFunctionCall, {
  valid: [
    {
      code: 'console.log("lalala")',
    },
    {
      code: 'console.log(t`lalala`)',
    },
    {
      code: 't("lalala", "lolo")',
    },
    {
      code: 't(foo)',
    },
  ],
  invalid: [
    {
      code: 'console.log(t("lalala"))',
      errors: [{ messageId: 'unnecessaryTFunctionCall' }],
    },
    {
      code: 'console.log(t`lalala ${`and`} lololo`)',
      errors: [{ messageId: 'unnecessaryTFunctionCall' }],
    },
  ],
});
