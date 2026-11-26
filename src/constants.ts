export const JWT_CLOCK_DRIFT_PROTECTION_DELAY = 60;
export const JWT_EXPIRATION_DELAY = 600;
export const GITHUB_REST_API_POST_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10"
};
export const PULL_REQUEST_TITLE = /chore: release version packages?/;
export const AUTO_MERGE_MESSAGE = "The auto-merge is enabled.";
export const RELEASE_CHANGE_BOT = process.env.RELEASE_CHANGE_USER || "release-change[bot]";
export const RELEASE_CHANGE_APPROVE_BOT = "release-change-approve[bot]";
export const RELEASE_CHANGE_APPROVE_BOT_2 = "release-change-approve-2[bot]";
