import type { RequestListener } from "http";
import { createNodeMiddleware as createWebhooksMiddleware } from "@octokit/webhooks";

import type { ApplicationFunction, MiddlewareOptions } from "./types.js";
import { defaultWebhooksPath } from "./server/server.js";
import { createBotapp } from "./create-botapp.js";

export function createNodeMiddleware(
  appFn: ApplicationFunction,
  { botapp = createBotapp(), webhooksPath } = {} as MiddlewareOptions,
): RequestListener {
  botapp.load(appFn);

  return createWebhooksMiddleware(botapp.webhooks, {
    path: webhooksPath || botapp.webhookPath || defaultWebhooksPath,
  });
}
