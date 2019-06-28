import CommitLog from "../../src/commitLog";
import Commit from "../../src/commit";
import StubExecSyncGitLog from "../lib/stubExecSyncGitLog";

const data = require("../data");

jest.mock("../../src/commit");
Commit.mockImplementation(details => {
  return {
    details: details
  };
});

describe("CommitLog", () => {
  beforeEach(() => {
    Commit.mockClear();
  });

  test("returns expected commits", () => {
    const stubbedLog: string = data.logs.featureAndBugfixCommits;
    StubExecSyncGitLog.stubCommits(stubbedLog);

    const commitLog: CommitLog = new CommitLog();
    const commits: Array<Commit> = commitLog.getCommits();

    const actual = {
      first: commits[0].details,
      second: commits[1].details
    };

    expect(actual.first).toEqual(stubbedLog[0]);
    expect(actual.second).toEqual(stubbedLog[1]);
  });

  test("returns expected commits", () => {
    const stubbedLog: string = data.logs.featureAndBugfixCommits;
    StubExecSyncGitLog.stubCommits(stubbedLog);

    const commitLog: CommitLog = new CommitLog();
    const commits: Array<Commit> = commitLog.getCommits();

    const actual = {
      first: commits[2].details,
      second: commits[3].details
    };

    expect(actual.first).toEqual(stubbedLog[2]);
    expect(actual.second).toEqual(stubbedLog[3]);
  });
});
