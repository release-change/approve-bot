import type { GitHubPayload } from "../types.js";

import {
  GITHUB_ACTIONS_BOT,
  RELEASE_CHANGE_BOT,
  RELEASE_CHANGE_BRANCH_PREFIX
} from "../constants.js";

export const isValidBot = (payload: GitHubPayload): boolean => {
  const {
    repository: { id: repositoryId },
    pull_request: {
      head: { ref, repo },
      user: { login: userLogin }
    },
    sender: { login: senderLogin }
  } = payload;
  if (senderLogin === GITHUB_ACTIONS_BOT || senderLogin === RELEASE_CHANGE_BOT) return true;
  return (
    ref.startsWith(RELEASE_CHANGE_BRANCH_PREFIX) &&
    repo?.id === repositoryId &&
    senderLogin === userLogin
  );
};
