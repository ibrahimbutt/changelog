import CommitLog from "../src/commitLog";
import FileSystem from "../src/fileSystem";
import Changelog from "../src/changelog";
import ChangelogFormatter from "../src/formatters/changelogFormatter";

import ActualCommitFormatter from "./lib/actualCommitFormatter";
import StubExecSyncGitLog from "./lib/stubExecSyncGitLog";

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

    expect(actual.first).toContain(expected.first);
    expect(actual.second).toContain(expected.second);
  });

  test("User can save commits to a file", () => {
    const stubbedCommits = {
      releaseSecond: testData.releases.second,
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

  test("Changelog has Added and Fixed section", () => {
    const stubbedCommits = {
      releaseSecond: testData.releases.second,
      first: testData.commits.first,
      releaseFirst: testData.releases.first,
      second: testData.commits.second
    };

    StubExecSyncGitLog.stubCommits(stubbedCommits);

    const commitLog = new CommitLog();

    const commits = commitLog.getCommits();

    const changelog = new Changelog(commits, ChangelogFormatter);

    let content = changelog.content();
    const expected = {
      first: `### Added\n\n- option to hide device serial\n`,
      second: `### Fixed\n\n- retrieve device name correctly\n`
    };

    expect(content).toContain(expected.first);
    expect(content).toContain(expected.second);
  });

  test("Changelog has version headers", () => {
    const stubbedCommits = {
      releaseSecond: testData.releases.second,
      first: testData.commits.first,
      releaseFirst: testData.releases.first,
      second: testData.commits.third
    };

    StubExecSyncGitLog.stubCommits(stubbedCommits);

    const commitLog = new CommitLog();
    const commits = commitLog.getCommits();
    const changelog = new Changelog(commits, ChangelogFormatter);

    let content = changelog.content();

    const expected = {
      first: `## v1.0.0\n\n### Added\n\n- option to hide device serial\n`,
      second: `## v0.1.0\n\n### Added\n\n- device serial getter\n`
    };

    expect(content).toContain(expected.first);
    expect(content).toContain(expected.second);
  });
});
