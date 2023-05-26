module.exports = {
  meta: {
    messages: {
      unnecessaryTFunctionCall: 'Use a tagged template instead',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const functionName = node.callee.name;
        if (functionName !== 't') {
          return;
        }

        if (node.arguments.length !== 1) {
          return;
        }

          if (node.arguments[0].type === 'Literal' || node.arguments[0].type === 'TemplateLiteral') {
          context.report({ node: node.arguments[0], messageId: 'unnecessaryTFunctionCall' });
        }
      },
    };
  },
};
