import type { GitHubPayload } from "../types.js";

import { RELEASE_CHANGE_BOT } from "../constants.js";

export const isValidBot = (payload: GitHubPayload): boolean => {
  return payload.sender.login === RELEASE_CHANGE_BOT;
};
