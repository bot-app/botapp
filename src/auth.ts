import { getAuthenticatedOctokit } from "./octokit/get-authenticated-octokit.js";
import { BotappOctokit } from "./octokit/botapp-octokit.js";
import type { State } from "./types.js";

/**
 * Authenticate and get a GitHub client that can be used to make API calls.
 *
 * You'll probably want to use `context.octokit` instead.
 *
 * **Note**: `app.auth` is asynchronous, so it needs to be prefixed with a
 * [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
 * to wait for the magic to happen.
 *
 * ```js
 *  export default (app) => {
 *    app.on('issues.opened', async context => {
 *      const octokit = await app.auth();
 *    });
 *  };
 * ```
 * @param state - Botapp application instance state, which is used to persist
 *
 * @param id - ID of the installation, which can be extracted from
 * `context.payload.installation.id`. If called without this parameter, the
 * client wil authenticate [as the app](https://docs.github.com/en/developers/apps/authenticating-with-github-apps#authenticating-as-a-github-app)
 * instead of as a specific installation, which means it can only be used for
 * [app APIs](https://docs.github.com/apps/).
 *
 * @returns An authenticated GitHub API client
 */
export async function auth(
  state: State,
  installationId?: number,
): Promise<InstanceType<typeof BotappOctokit>> {
  return getAuthenticatedOctokit(Object.assign({}, state), installationId);
}
