module.exports = {
  meta: {
    type: 'problem',
    messages: {
      noVariablesInTTaggedTemplate:
        'Use a regular function call instead, and pass the variables as an object argument.\nExample: t`Hello ${name}` -> t("Hello {{name}}", { name })',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        const functionName = node.tag.name;
        if (functionName !== 't') {
          return;
        }

        if (node.quasi.expressions.length > 0) {
          // we're just using {{name}} as an example in the meta.messages for "noVariablesInTTaggedTemplate", so it's fine to ignore this rule here
          // eslint-disable-next-line eslint-plugin/no-missing-placeholders
          context.report({ node: node.quasi, messageId: 'noVariablesInTTaggedTemplate' });
        }
      },
    };
  },
};
