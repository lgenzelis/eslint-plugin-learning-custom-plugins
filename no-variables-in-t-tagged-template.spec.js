const { RuleTester } = require('eslint');
const noVariablesInTTaggedTemplate = require('./no-variables-in-t-tagged-template');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 'latest' } });

ruleTester.run('no-variables-in-t-tagged-template', noVariablesInTTaggedTemplate, {
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
      code: 't(foo)',
    },
    {
      code: 'foo`hello ${name}`',
    },
  ],
  invalid: [
    {
      code: 't`hello ${name}`',
      errors: [{ messageId: 'noVariablesInTTaggedTemplate' }],
    },
    {
      code: 't`hello ${name1} and ${name2}`',
      errors: [{ messageId: 'noVariablesInTTaggedTemplate' }],
    },
  ],
});
