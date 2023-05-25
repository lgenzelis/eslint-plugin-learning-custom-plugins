const { RuleTester } = require("eslint");
const noUntranslatedText = require("./no-untranslated-text");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
});

ruleTester.run("no-untranslated-text", noUntranslatedText, {
  valid: [
    {
      code: "console.log('asdf')",
    },
    {
      code: `function TestComponent() {
        return <div style="color: red" />;
      }`,
    },
    {
      code: `function TestComponent() {
        return <div style="color: red" aria-label={t\`some label\`} />;
      }`,
    },
    {
      code: `function TestComponent() {
        return <div aria-label={t\`some label\`}>
            <span>{t\`lalala\`}</span>
          </div>;
      }`,
    },
    {
      code: `<TestComponent>{t\`lalala\`}</TestComponent>;`,
    },
    {
      code: `<TestComponent>42</TestComponent>;`,
    },
    {
      code: "<TestComponent aria-label={t`some aria label`}>{t`lalala`}</TestComponent>;",
    },
  ],
  invalid: [
    {
      code: `function TestComponent() {
        return <div style="color: red">some text</div>;
      }`,
      errors: [{ messageId: "untranslatedTextChild" }],
    },
    {
      code: `function TestComponent() {
        return <div style="color: red" aria-label="some label" />;
      }`,
      errors: [{ messageId: "untranslatedAriaLabel" }],
    },
    {
      code: `function TestComponent() {
        return <div style="color: red" aria-label="some label">
            <span>lalala</span>
          </div>;
      }`,
      errors: [{ messageId: "untranslatedAriaLabel" }, { messageId: "untranslatedTextChild" }],
    },
    {
      code: `<TestComponent>lalala</TestComponent>;`,
      errors: [{ messageId: "untranslatedTextChild" }],
    },
    {
      code: '<TestComponent aria-label="some aria label">{t`lalala`}</TestComponent>;',
      errors: [{ messageId: "untranslatedAriaLabel" }],
    },
  ],
});
