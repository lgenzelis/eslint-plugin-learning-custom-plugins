const reg = /\{\{\w*\}\}/g;

module.exports = {
  meta: {
    type: 'problem',
    messages: {
      emptyTFunctionCall: 'You need to pass at least one argument to the t function',
      unnecessaryTFunctionCall: 'Use a tagged template instead',
      templateLiteralAsFirstArg: 'First argument should be a regular string',
      noObjectLiteralAsSecondArgument:
        'The second argument of the t function should be an object literal, otherwise we cannot check for missing keys.',
      numberOfKeysMismatch:
        'The number of keys in the object literal does not match the number of variables in the string',
      keyMismatch: 'The key "{{key}}" is missing in the object literal',
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        const functionName = node.callee.name;
        if (functionName !== 't') {
          return;
        }

        if (node.arguments.length < 1) {
          context.report({ node, messageId: 'emptyTFunctionCall' });
          return;
        }

        if (node.arguments.length === 1) {
          if (node.arguments[0].type === 'Literal' || node.arguments[0].type === 'TemplateLiteral') {
            context.report({ node: node.arguments[0], messageId: 'unnecessaryTFunctionCall' });
          }
          return;
        }

        const text = node.arguments[0];
        if (text.type === 'TemplateLiteral') {
          context.report({ node: text, messageId: 'templateLiteralAsFirstArg' });
          return;
        }

        const values = node.arguments[1];

        if (values.type !== 'ObjectExpression') {
          context.report({ node: values, messageId: 'noObjectLiteralAsSecondArgument' });
          return;
        }

        if (text.type !== 'Literal') {
          // not much we can do here
          return;
        }

        const matches = text.value.match(reg);
        if (!matches || matches.length !== values.properties.length) {
          context.report({ node: values, messageId: 'numberOfKeysMismatch' });
          return;
        }

        for (const match of matches) {
          const matchKey = match.slice(2, -2);
          const matchHasCorrespondingKey = values.properties.some((property) => property.key.name === matchKey);
          if (!matchHasCorrespondingKey) {
            context.report({ node: values, messageId: 'keyMismatch', data: { key: matchKey } });
          }
        }
      },
    };
  },
};
