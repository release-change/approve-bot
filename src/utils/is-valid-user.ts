import type { GitHubPayloadPullRequestReview } from "../types.js";

import { RELEASE_CHANGE_BOT } from "../constants.js";

export const isValidUser = (payload: GitHubPayloadPullRequestReview): boolean => {
  return payload.pull_request.user.login === RELEASE_CHANGE_BOT;
};
