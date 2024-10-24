/**
 * @param {{app: import("../..".Botapp)}}
 */
module.exports = (app) => {
  app.log.info("loaded app");

  app.on("issue_comment.created", async (context) => {
    context.log.info("Comment created");
  });
};
