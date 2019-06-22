import CommitLog from "../src/commitLog";
import FileSystem from "../src/fileSystem";

import ActualCommitFormatter from "./lib/actualCommitFormatter";
import StubExecSyncGitLog from "./lib/stubExecSyncGitLog";
import { conditionalExpression } from "@babel/types";
const testData = require("./lib/data");

const fs = require("fs");

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

  test("User can save commits to a file", () => {
    const stubbedCommits = {
      first: testData.commits.first,
      second: testData.commits.second
    };

    StubExecSyncGitLog.stubCommits(stubbedCommits);

    const commitLog = new CommitLog();
    const commits = commitLog.getCommits();

    let content = "";
    commits.forEach(commit => (content += commit.getDetails() + "\n"));

    fs.writeFileSync = jest.fn();
    FileSystem.create("CHANGELOG.md", content);

    expect(fs.writeFileSync).toHaveBeenCalledWith("CHANGELOG.md", content);
  });
});
