import CommitLog from "../src/commitLog";
import FileSystem from "../src/fileSystem";
import Changelog from "../src/changelog";
import ChangelogFormatter from "../src/formatters/changelogFormatter";

import ActualCommitFormatter from "./lib/actualCommitFormatter";
import StubExecSyncGitLog from "./lib/stubExecSyncGitLog";

const fs = require("fs");

const data = require("./data");

describe("Feature Tests", () => {
  test("User can retrieve commit log", () => {
    const expected = {
      first: data.commits.feature.standard,
      second: data.commits.feature.scoped
    };

    StubExecSyncGitLog.stubCommits(expected);

    const commitLog = new CommitLog();

    const actualCommits = commitLog.getCommits();
    const actual = ActualCommitFormatter.format(actualCommits);

    expect(actual.first).toContain(expected.first);
    expect(actual.second).toContain(expected.second);
  });

  test("User can save commits to a file", () => {
    const expected = {
      release: data.commits.release.one,
      first: data.commits.feature.standard,
      second: data.commits.feature.scoped
    };

    StubExecSyncGitLog.stubCommits(expected);

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
      releaseTwo: data.commits.release.two,
      first: data.commits.feature.standard,
      releaseOne: data.commits.release.one,
      second: data.commits.bugfix.standard
    };

    StubExecSyncGitLog.stubCommits(stubbedCommits);

    const commitLog = new CommitLog();

    const commits = commitLog.getCommits();

    const changelog = new Changelog(commits, ChangelogFormatter);

    let content = changelog.content();
    const expected = {
      first: `### Added\n\n${data.formattedCommits.feature.standard}\n`,
      second: `### Fixed\n\n${data.formattedCommits.bugfix.standard}\n`
    };

    expect(content).toContain(expected.first);
    expect(content).toContain(expected.second);
  });

  test("Changelog has version headers", () => {
    const stubbedCommits = {
      releaseTwo: data.commits.release.two,
      first: data.commits.feature.standard,
      releaseOne: data.commits.release.one,
      second: data.commits.bugfix.standard
    };

    StubExecSyncGitLog.stubCommits(stubbedCommits);

    const commitLog = new CommitLog();
    const commits = commitLog.getCommits();
    const changelog = new Changelog(commits, ChangelogFormatter);

    let content = changelog.content();

    const expected = {
      first: `## v1.0.0 – 21 Jun 2019\n\n### Added\n\n${
        data.formattedCommits.feature.standard
      }\n`,
      second: `## v0.1.0 – 21 Jun 2019\n\n### Fixed\n\n${
        data.formattedCommits.bugfix.standard
      }\n`
    };

    expect(content).toContain(expected.first);
    expect(content).toContain(expected.second);
  });
});
