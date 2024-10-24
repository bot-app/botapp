import { describe, expect, test } from "vitest";

import { botappView } from "../../src/views/botapp.js";

describe("botappView", () => {
  test("not providing parameters", () => {
    expect(botappView({})).toMatchSnapshot();
  });

  test("providing name", () => {
    expect(
      botappView({
        name: "My App",
      }),
    ).toMatchSnapshot();
  });

  test("providing description", () => {
    expect(
      botappView({
        description: "My App with Botapp",
      }),
    ).toMatchSnapshot();
  });

  test("providing description", () => {
    expect(
      botappView({
        version: "1.0.0",
      }),
    ).toMatchSnapshot();
  });
});
