import type { GitHubPayload } from "../types.js";

import { AUTO_MERGE_MESSAGE } from "../constants.js";

export const isAutoMerging = (payload: GitHubPayload): boolean => {
  return payload.pull_request.body?.includes(AUTO_MERGE_MESSAGE) ?? false;
};
