import { beforeEach, expect, it, vi } from "vitest";

import * as approvePullRequestModule from "../src/handler/approve-pull-request.js";
import { handleWebhook } from "../src/handler/handle-webhook.js";
import * as getInstallationTokenModule from "../src/utils/get-installation-token.js";
import { mockSign } from "./fixtures/mock-sign.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedInvalidPayloads } from "./fixtures/mocked-invalid-payloads.js";
import { mockedValidPayloads } from "./fixtures/mocked-valid-payloads.js";

beforeEach(() => {
  vi.spyOn(getInstallationTokenModule, "getInstallationToken").mockResolvedValue("fake-token");
  vi.spyOn(approvePullRequestModule, "approvePullRequest").mockResolvedValue();
});

it("should reject an invalid signature", async () => {
  const body = JSON.stringify(mockedValidPayloads);
  const result = await handleWebhook(
    mockedConfig,
    { "x-github-event": "pull_request", "x-hub-signature-256": "sha256=invalid" },
    body
  );
  expect(result).toStrictEqual({ status: 401, message: "Invalid signature" });
});
it.each([...mockedInvalidPayloads, ...mockedValidPayloads])(
  "should ignore any events which are not pull request",
  async payload => {
    const body = JSON.stringify(payload);
    const result = await handleWebhook(
      mockedConfig,
      { "x-github-event": "push", "x-hub-signature-256": mockSign(body) },
      body
    );
    expect(result).toStrictEqual({ status: 200, message: "Event ignored" });
    expect(approvePullRequestModule.approvePullRequest).not.toHaveBeenCalled();
  }
);
it.each(mockedInvalidPayloads)(
  "should ignore a pull request not meeting the conditions to be approved",
  async mockedInvalidPayload => {
    const body = JSON.stringify(mockedInvalidPayload);
    const result = await handleWebhook(
      mockedConfig,
      { "x-github-event": "pull_request", "x-hub-signature-256": mockSign(body) },
      body
    );
    expect(result).toStrictEqual({
      status: 200,
      message: "Action ignored"
    });
    expect(approvePullRequestModule.approvePullRequest).not.toHaveBeenCalled();
  }
);
it.each(mockedValidPayloads)("should approve a valid pull request", async mockedValidPayload => {
  const body = JSON.stringify(mockedValidPayload);
  const result = await handleWebhook(
    mockedConfig,
    { "x-github-event": "pull_request", "x-hub-signature-256": mockSign(body) },
    body
  );
  expect(result).toStrictEqual({
    status: 200,
    message: "Pull request approved"
  });
  expect(approvePullRequestModule.approvePullRequest).toHaveBeenCalledWith(
    "fake-token",
    "owner",
    "repo",
    1
  );
});
