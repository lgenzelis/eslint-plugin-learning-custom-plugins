const { RuleTester } = require('eslint');
const noUnnecessaryBackticks = require('./no-unnecessary-back-ticks');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 'latest' } });

ruleTester.run('no-unnecessary-back-ticks', noUnnecessaryBackticks, {
  valid: [
    {
      code: 'console.log()',
    },
    {
      code: "console.log('lalala')",
    },
    {
      code: 'console.log(`the best number is ${42}`)',
    },
    {
      code: 'console.log(`${42} the best number is`)',
    },
    {
      code: 'console.log(`some boring numbers are ${12} and ${77}.`)',
    },
    {
      code: 'console.log(myTaggedTemplate`lalala`)',
    },
    {
      code: `console.log(\`one line
      and another one\`)`,
    },
  ],
  invalid: [
    {
      code: 'console.log(``)',
      errors: [{ messageId: 'noUnnecessaryBacktick' }],
    },
    {
      code: 'console.log(`lalala ${`and`} lololo`)',
      errors: [{ messageId: 'noUnnecessaryBacktick' }],
    },
    {
      code: 'console.log(`lalala and lololo`)',
      errors: [{ messageId: 'noUnnecessaryBacktick' }],
    },
  ],
});
