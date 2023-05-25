module.exports = {
  meta: {
    messages: {
      untranslatedTextChild: "Text children should be internationalized",
      untranslatedAriaLabel: "aria-labels should be internationalized",
    },
  },
  create(context) {
    return {
      JSXText(node) {
        const isNotNumber = Number.isNaN(+node.value);
        if (isNotNumber) {
          context.report({ node, messageId: "untranslatedTextChild" });
        }
      },
      JSXAttribute(node) {
        if (node.name.name !== "aria-label") {
          return;
        }

        if (node.value.type !== "Literal") {
          return;
        }

        context.report({ node, messageId: "untranslatedAriaLabel" });
      },
    };
  },
};
