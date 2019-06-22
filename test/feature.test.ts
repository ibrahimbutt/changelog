import CommitLog from "../src/commitLog";

import ActualCommitFormatter from "./lib/actualCommitFormatter";
import StubExecSyncGitLog from "./lib/stubExecSyncGitLog";
const testData = require("./lib/data");

describe("Feature Tests", () => {
  test("User can retrieve commit log", () => {
    const expected = {
      first: testData.commits.first,
      second: testData.commits.second
    };

    StubExecSyncGitLog.stubCommits(expected);

    const commitLog = new CommitLog();

    const actualCommits = commitLog.getCommits();
    const actual = ActualCommitFormatter.format(actualCommits);

    expect(actual.first).toEqual(expected.first);
    expect(actual.second).toEqual(expected.second);
  });
});
