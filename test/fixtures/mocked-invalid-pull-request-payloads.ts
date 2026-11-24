export const mockedInvalidPullRequestPayloads = [
  {
    action: "closed",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "release-change[bot]" },
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "release-change[bot]" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "feat: something",
      user: { login: "release-change[bot]" },
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "release-change[bot]" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "release-change[bot]" },
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "No special phrase here."
    },
    sender: { login: "release-change[bot]" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "release-changes/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "not-release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "release-change", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "invalid-branch", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "another-user" },
      head: { ref: "release-change/main/1.2.3", repo: { id: 123 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "release-change/main/1.2.3", repo: { id: 456 } },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  },
  {
    action: "opened",
    installation: { id: 42 },
    repository: { id: 123, owner: { login: "owner" }, name: "repo" },
    pull_request: {
      number: 1,
      title: "chore: release version package",
      user: { login: "unknown-bot" },
      head: { ref: "release-change/main/1.2.3", repo: null },
      body: "Some text. The auto-merge is enabled. More text."
    },
    sender: { login: "unknown-bot" }
  }
];
