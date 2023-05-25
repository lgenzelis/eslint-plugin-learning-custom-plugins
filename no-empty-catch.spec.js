const { RuleTester } = require("eslint");
const noEmptyCatchRule = require("./no-empty-catch.js");

const ruleTester = new RuleTester();

ruleTester.run("no-empty-catch", noEmptyCatchRule, {
  valid: [
    {
      code: `try { foo() } catch (e) { bar() }`,
    },
    {
      code: `try { foo() } catch (e) { console.log(); }`,
    },
    {
      code: `try { foo() } catch (e) { /*lalala*/ }`,
    },
  ],
  invalid: [
    {
      code: `try { foo() } catch (e) {}`,
      errors: [{ messageId: "emptyCatch" }],
    },
    {
      code: `try { 
        foo();
      } catch (e) {
      
      }`,
      errors: [{ messageId: "emptyCatch" }],
    },
  ],
});
