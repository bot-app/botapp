import type { LogLevel, Options as PinoOptions } from "@botapp/pino";
import { getPrivateKey } from "@botapp/get-private-key";

import { getLog } from "./helpers/get-log.js";
import type { Options } from "./types.js";
import { Botapp } from "./botapp.js";
import { defaultWebhooksPath } from "./server/server.js";

type CreateBotappOptions = {
  overrides?: Options;
  defaults?: Options;
  env?: Partial<NodeJS.ProcessEnv>;
};

const DEFAULTS: Partial<NodeJS.ProcessEnv> = {
  APP_ID: "",
  WEBHOOK_SECRET: "",
  WEBHOOK_PATH: defaultWebhooksPath,
  GHE_HOST: "",
  GHE_PROTOCOL: "https",
  LOG_FORMAT: undefined,
  LOG_LEVEL: "warn",
  LOG_LEVEL_IN_STRING: "false",
  LOG_MESSAGE_KEY: "msg",
  REDIS_URL: "",
  SENTRY_DSN: "",
};

/**
 * Merges configuration from defaults/environment variables/overrides and returns
 * a Botapp instance. Finds private key using [`@botapp/get-private-key`](https://github.com/bot-app/get-private-key).
 *
 * @see https://botapp.github.io/docs/configuration/
 * @param defaults default Options, will be overwritten if according environment variable is set
 * @param overrides overwrites defaults and according environment variables
 * @param env defaults to process.env
 */
export function createBotapp({
  overrides = {},
  defaults = {},
  env = process.env,
}: CreateBotappOptions = {}) {
  const privateKey = getPrivateKey({ env });
  const envWithDefaults = { ...DEFAULTS, ...env };

  const envOptions: Options = {
    logLevel: envWithDefaults.LOG_LEVEL as LogLevel,
    appId: Number(envWithDefaults.APP_ID),
    privateKey: (privateKey && privateKey.toString()) || undefined,
    secret: envWithDefaults.WEBHOOK_SECRET,
    redisConfig: envWithDefaults.REDIS_URL,
    webhookPath: envWithDefaults.WEBHOOK_PATH,
    baseUrl: envWithDefaults.GHE_HOST
      ? `${envWithDefaults.GHE_PROTOCOL || "https"}://${
          envWithDefaults.GHE_HOST
        }/api/v3`
      : "https://api.github.com",
  };

  const botappOptions = {
    ...defaults,
    ...envOptions,
    ...overrides,
  };

  const log = getLog({
    level: botappOptions.logLevel,
    logFormat: envWithDefaults.LOG_FORMAT as PinoOptions["logFormat"],
    logLevelInString: envWithDefaults.LOG_LEVEL_IN_STRING === "true",
    logMessageKey: envWithDefaults.LOG_MESSAGE_KEY,
    sentryDsn: envWithDefaults.SENTRY_DSN,
  }).child({ name: "server" });

  return new Botapp({
    log: log.child({ name: "botapp" }),
    ...botappOptions,
  });
}
