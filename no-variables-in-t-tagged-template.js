module.exports = {
  meta: {
    messages: {
      noVariablesInTTaggedTemplate:
        'Use a regular function call instead, and pass the variables as an object argument.\nExample: t`Hello ${name}` -> t("Hello {{name}}", { name })',
    },
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        const functionName = node.tag.name;
        if (functionName !== 't') {
          return;
        }

        if (node.quasi.expressions.length > 0) {
          context.report({ node: node.quasi, messageId: 'noVariablesInTTaggedTemplate' });
        }
      },
    };
  },
};
