import type { AppConfig, GitHubPayload } from "../types.js";

import { getInstallationToken } from "../utils/get-installation-token.js";
import { isAutoMerging } from "../utils/is-auto-merging.js";
import { isValidBot } from "../utils/is-valid-bot.js";
import { isValidTitle } from "../utils/is-valid-title.js";
import { verifySignature } from "../utils/verify-signature.js";
import { approvePullRequest } from "./approve-pull-request.js";

export const handleWebhook = async (
  config: AppConfig,
  headers: Record<string, string | undefined>,
  rawBody: string
): Promise<{ status: number; message: string }> => {
  if (!verifySignature(config.webhookSecret, rawBody, headers["x-hub-signature-256"])) {
    return {
      status: 401,
      message: "Invalid signature"
    };
  }
  const event = headers["x-github-event"];
  if (event === "pull_request") {
    const payload: GitHubPayload = JSON.parse(rawBody);
    if (
      payload.action === "opened" &&
      isValidTitle(payload) &&
      isValidBot(payload) &&
      isAutoMerging(payload)
    ) {
      const {
        pull_request: { number },
        installation: { id: installationId },
        repository: {
          name,
          owner: { login }
        }
      } = payload;
      const token = await getInstallationToken(config, installationId);
      await approvePullRequest(token, login, name, number);
      return { status: 200, message: "Pull request approved" };
    }
    return { status: 200, message: "Action ignored" };
  }
  return { status: 200, message: "Event ignored" };
};
