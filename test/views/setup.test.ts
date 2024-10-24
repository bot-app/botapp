import { describe, expect, test } from "vitest";

import { setupView } from "../../src/views/setup.js";

describe("setupView", () => {
  test("providing bare minimum ", () => {
    expect(
      setupView({
        createAppUrl:
          "https://github.com/organizations/botapp/settings/apps/new",
        manifest: JSON.stringify({ name: "My App" }),
      }),
    ).toMatchSnapshot();
  });

  test("provide also name", () => {
    expect(
      setupView({
        name: "My App",
        createAppUrl:
          "https://github.com/organizations/botapp/settings/apps/new",
        manifest: JSON.stringify({ name: "My App" }),
      }),
    ).toMatchSnapshot();
  });

  test("provide also version", () => {
    expect(
      setupView({
        version: "1.0.0",
        createAppUrl:
          "https://github.com/organizations/botapp/settings/apps/new",
        manifest: JSON.stringify({ name: "My App" }),
      }),
    ).toMatchSnapshot();
  });

  test("provide also description", () => {
    expect(
      setupView({
        description: "Awesome App with Botapp",
        createAppUrl:
          "https://github.com/organizations/botapp/settings/apps/new",
        manifest: JSON.stringify({ name: "My App" }),
      }),
    ).toMatchSnapshot();
  });
});
