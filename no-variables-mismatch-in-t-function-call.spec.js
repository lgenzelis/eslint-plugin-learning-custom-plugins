const { RuleTester } = require('eslint');
const noVariablesMismatchInTFunctionCall = require('./no-variables-mismatch-in-t-function-call');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 'latest' } });

ruleTester.run('no-variables-in-t-tagged-template', noVariablesMismatchInTFunctionCall, {
  valid: [
    {
      code: 'console.log("lalala")',
    },
    {
      code: 'console.log(t`lalala`)',
    },
    {
      code: 't("hello {{name}}", { name: "John" })',
    },
    {
      code: 't("hello {{name}} {{lastname}}", { lastname: "Bonachon", name: "John" })',
    },
    {
      code: 't(foo)',
    },
    {
      code: 't(foo, { name: "John" })',
    },
  ],
  invalid: [
    {
      code: 't()',
      errors: [{ messageId: 'noEmptyCall' }],
    },
    {
      code: 't("lalala")',
      errors: [{ messageId: 'unnecessaryTFunctionCall' }],
    },
    {
      code: 't(`lalala`)',
      errors: [{ messageId: 'unnecessaryTFunctionCall' }],
    },
    {
      code: 'console.log(t(`lalala ${`and`} lololo`))',
      errors: [{ messageId: 'unnecessaryTFunctionCall' }],
    },
    {
      code: 't(`hello {{name}}`, { name: "John" })',
      errors: [{ messageId: 'noTemplateLiteralAsFirstArg' }],
    },
    {
      code: 't("hello {{name}} {{lastName}}", { name: "John" })',
      errors: [{ messageId: 'numberOfKeysMismatch' }],
    },
    {
      code: 't("hello {{name}} {{lastName}}", { name: "John", lastname: "Bonachon" })',
      errors: [{ messageId: 'keyMismatch', data: { key: 'lastName' } }],
    },
    {
      code: 't("lalala", "lolo")',
      errors: [{ messageId: 'noObjectLiteralAsSecondArgument' }],
    },
    {
      code: 't("hello {{name}} {{lastName}}", someObject)',
      errors: [{ messageId: 'noObjectLiteralAsSecondArgument' }],
    },
  ],
});
