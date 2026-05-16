export const mockedValidPayload = {
  action: "opened",
  installation: { id: 42 },
  repository: { owner: { login: "owner" }, name: "repo" },
  pull_request: {
    number: 1,
    title: "chore: release version package [skip ci]",
    user: { login: "github-actions[bot]" },
    body: "Some text. The auto-merge is enabled. More text."
  },
  sender: { login: "github-actions[bot]" }
};
