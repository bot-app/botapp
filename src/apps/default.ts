import { resolve } from "node:path";

import type { ApplicationFunctionOptions, Botapp } from "../index.js";
import { loadPackageJson } from "../helpers/load-package-json.js";
import { botappView } from "../views/botapp.js";

export function defaultApp(
  _app: Botapp,
  { getRouter, cwd = process.cwd() }: ApplicationFunctionOptions,
) {
  if (!getRouter) {
    throw new Error("getRouter() is required for defaultApp");
  }

  const pkg = loadPackageJson(resolve(cwd, "package.json"));
  const botappViewRendered = botappView({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  });
  const router = getRouter();

  router.get("/botapp", (_req, res) => {
    res.send(botappViewRendered);
  });

  router.get("/", (_req, res) => res.redirect("/botapp"));
}
