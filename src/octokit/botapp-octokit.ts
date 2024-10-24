import { Octokit } from "@octokit/core";
import { enterpriseCompatibility } from "@octokit/plugin-enterprise-compatibility";
import type { RequestOptions } from "@octokit/types";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { legacyRestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import { config } from "@botapp/octokit-plugin-config";
import { createProbotAuth } from "octokit-auth-botapp";

import { botappRequestLogging } from "./octokit-plugin-botapp-request-logging.js";
import { VERSION } from "../version.js";

const defaultOptions = {
  authStrategy: createProbotAuth,
  throttle: {
    enabled: true,
    onSecondaryRateLimit: (
      retryAfter: number,
      options: RequestOptions,
      octokit: Octokit,
    ) => {
      octokit.log.warn(
        `Secondary Rate limit hit with "${options.method} ${options.url}", retrying in ${retryAfter} seconds.`,
      );
      return true;
    },
    onRateLimit: (
      retryAfter: number,
      options: RequestOptions,
      octokit: Octokit,
    ) => {
      octokit.log.warn(
        `Rate limit hit with "${options.method} ${options.url}", retrying in ${retryAfter} seconds.`,
      );
      return true;
    },
  },
  userAgent: `botapp/${VERSION}`,
};

export const BotappOctokit = Octokit.plugin(
  throttling,
  retry,
  paginateRest,
  legacyRestEndpointMethods,
  enterpriseCompatibility,
  botappRequestLogging,
  config,
).defaults((instanceOptions: any) => {
  // merge throttle options deeply
  const options = {
    ...defaultOptions,
    ...instanceOptions,
    ...{
      throttle: { ...defaultOptions.throttle, ...instanceOptions?.throttle },
    },
  };

  return options;
});

export type BotappOctokit = InstanceType<typeof BotappOctokit>;
