import CommitLog from "../../src/commitLog";

import ActualCommitFormatter from "../lib/actualCommitFormatter";
import StubExecSyncGitLog from "../lib/stubExecSyncGitLog";
const testData = require("../lib/data");

describe("CommitLog", () => {
  test("returns expected commits", () => {
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

  test("returns expected commits", () => {
    const expected = {
      first: testData.commits.third,
      second: testData.commits.fourth
    };

    StubExecSyncGitLog.stubCommits(expected);

    const commitLog = new CommitLog();

    const actualCommits = commitLog.getCommits();
    const actual = ActualCommitFormatter.format(actualCommits);

    expect(actual.first).toEqual(expected.first);
    expect(actual.second).toEqual(expected.second);
  });
});
