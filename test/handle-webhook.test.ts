import { beforeEach, expect, it, vi } from "vitest";

import * as approvePullRequestModule from "../src/handler/approve-pull-request.js";
import { handleWebhook } from "../src/handler/handle-webhook.js";
import * as getInstallationTokenModule from "../src/utils/get-installation-token.js";
import { mockSign } from "./fixtures/mock-sign.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedInvalidPullRequestPayloads } from "./fixtures/mocked-invalid-pull-request-payloads.js";
import { mockedInvalidPullRequestReviewPayloads } from "./fixtures/mocked-invalid-pull-request-review-payloads.js";
import { mockedValidPullRequestPayloads } from "./fixtures/mocked-valid-pull-request-payloads.js";
import { mockedValidPullRequestReviewPayloads } from "./fixtures/mocked-valid-pull-request-review-payloads.js";

beforeEach(() => {
  vi.spyOn(getInstallationTokenModule, "getInstallationToken").mockResolvedValue("fake-token");
  vi.spyOn(approvePullRequestModule, "approvePullRequest").mockResolvedValue();
});

it("should reject an invalid signature", async () => {
  const body = JSON.stringify(mockedValidPullRequestPayloads);
  const result = await handleWebhook(
    mockedConfig,
    { "x-github-event": "pull_request", "x-hub-signature-256": "sha256=invalid" },
    body
  );
  expect(result).toStrictEqual({ status: 401, message: "Invalid signature" });
});
it.each([...mockedInvalidPullRequestPayloads, ...mockedValidPullRequestPayloads])(
  "should ignore any events which are not pull request nor pull request review",
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
it.each(mockedInvalidPullRequestPayloads)(
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
it.each(mockedValidPullRequestPayloads)(
  "should approve a valid pull request",
  async mockedValidPayload => {
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
  }
);
it.each(mockedInvalidPullRequestReviewPayloads)(
  "should ignore a pull request review not meeting the conditions to be approved again",
  async mockedInvalidPayload => {
    const body = JSON.stringify(mockedInvalidPayload);
    const result = await handleWebhook(
      mockedConfig,
      { "x-github-event": "pull_request_review", "x-hub-signature-256": mockSign(body) },
      body
    );
    expect(result).toStrictEqual({
      status: 200,
      message: "Action ignored"
    });
    expect(approvePullRequestModule.approvePullRequest).not.toHaveBeenCalled();
  }
);
it.each(mockedValidPullRequestReviewPayloads)(
  "should approve a valid pull request again when a review has been dismissed",
  async mockedValidPayload => {
    const body = JSON.stringify(mockedValidPayload);
    const result = await handleWebhook(
      mockedConfig,
      { "x-github-event": "pull_request_review", "x-hub-signature-256": mockSign(body) },
      body
    );
    expect(result).toStrictEqual({
      status: 200,
      message: "Pull request approved again"
    });
    expect(approvePullRequestModule.approvePullRequest).toHaveBeenCalledWith(
      "fake-token",
      "owner",
      "repo",
      1
    );
  }
);
