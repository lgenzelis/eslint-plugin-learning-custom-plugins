module.exports = {
  meta: {
    messages: {
      noUnnecessaryBacktick: "Unnecessary backtick, prefer single or double quotes",
      unexpectedQuasisLength: "We have no expressions but quasis length is not 1. How is this even possible?",
    },
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        // if the parent node is a TaggedTemplateExpression, then we're good
        if (node.parent.type === "TaggedTemplateExpression") {
          return;
        }

        if (node.expressions.length > 0) {
          // there's an expression in here, so we're good
          return;
        }

        if (node.quasis.length !== 1) {
          context.report({ node, messageId: "unexpectedQuasisLength" });
          return;
        }

        const quasi = node.quasis[0];
        if (quasi.value.raw.includes("\n")) {
          // there's a newline, so it makes sense to use a backtick
          return;
        }

        context.report({ node, messageId: "noUnnecessaryBacktick" });
      },
    };
  },
};
