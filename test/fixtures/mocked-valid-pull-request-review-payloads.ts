export const mockedValidPullRequestReviewPayloads = [
  {
    action: "dismissed",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    review: {
      user: { login: "release-change-approve[bot]" }
    }
  },
  {
    action: "dismissed",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    review: {
      user: { login: "release-change-approve-2[bot]" }
    }
  },
  {
    action: "dismissed",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version packages",
      head: { ref: "release-change/main/a-1.2.3_b-4.5.6", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    review: {
      user: { login: "release-change-approve[bot]" }
    }
  },
  {
    action: "dismissed",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version packages",
      head: { ref: "release-change/main/a-1.2.3_b-4.5.6", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    review: {
      user: { login: "release-change-approve-2[bot]" }
    }
  }
];
