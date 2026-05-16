import { GITHUB_REST_API_POST_HEADERS } from "../constants.js";

export const approvePullRequest = async (
  token: string,
  owner: string,
  repo: string,
  pullRequestNumber: number
): Promise<void> => {
  const uri = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullRequestNumber}/reviews`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      ...GITHUB_REST_API_POST_HEADERS,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      event: "APPROVE"
    })
  });
  const { ok, status, statusText } = response;
  if (!ok || status !== 200) {
    throw new Error(
      `Failed to approve the pull request #${pullRequestNumber}: ${status} ${statusText}`
    );
  }
};
