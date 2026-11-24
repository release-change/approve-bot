import type { GitHubPayloadPullRequestReview } from "../types.js";

import { RELEASE_CHANGE_APPROVE_BOT, RELEASE_CHANGE_APPROVE_BOT_2 } from "../constants.js";

export const isValidApprover = (payload: GitHubPayloadPullRequestReview): boolean => {
  const {
    review: {
      user: { login }
    }
  } = payload;
  return login === RELEASE_CHANGE_APPROVE_BOT || login === RELEASE_CHANGE_APPROVE_BOT_2;
};
