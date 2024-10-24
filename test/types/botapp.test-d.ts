import { RepositoryEditedEvent } from "@octokit/webhooks-types";
import { expectType } from "tsd";
import { Botapp } from "../../src/index.js";

const app = new Botapp({});

app.on("repository.edited", (context) => {
  expectType<RepositoryEditedEvent>(context.payload);
});
