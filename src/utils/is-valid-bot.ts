import type { GitHubPayload } from "../types.js";

import { GITHUB_ACTIONS_BOT } from "../constants.js";

export const isValidBot = (payload: GitHubPayload): boolean => {
  return payload.sender.login === GITHUB_ACTIONS_BOT;
};
