module.exports = {
  meta: {
    messages: {
      emptyCatch: "Empty catch block is not allowed.",
      noBlockStatement: "WHAT? No block statement? Are you kidding me?",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      CatchClause(node) {
        const catchBlock = node.body;
        if (catchBlock.type !== "BlockStatement") {
          context.report({ node: catchBlock, messageId: "noBlockStatement" });
          return;
        }
        if (catchBlock.body.length !== 0) {
          // there's actual code in here, so we're good
          return;
        }

        // now we check for comments
        const comments = sourceCode.getCommentsInside(catchBlock);
        if (comments.length > 0) {
          // just comments? fine
          return;
        }

        context.report({ node: node.body, messageId: "emptyCatch" });
      },
    };
  },
};
