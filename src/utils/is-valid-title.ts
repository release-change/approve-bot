import type { GitHubPayload } from "../types.js";

import { PULL_REQUEST_TITLE } from "../constants.js";

export const isValidTitle = (payload: GitHubPayload): boolean => {
  return payload.pull_request.title.match(PULL_REQUEST_TITLE) !== null;
};
